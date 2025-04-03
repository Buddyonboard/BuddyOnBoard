import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import CONST from '@/utils/Constants';
import { useSearchParams } from 'react-router-dom';
import { useFirebase } from '@/context/Firebase-Context';
import { toast } from 'sonner';
import MessageAfterSubmit from '@/components/ReUsable/MessageAfterSubmit';
import CreateNewPassword from './Create-New-Password';

const checkCircle = <CONST.circleCheck color="green" />;

export default function ResetPassword() {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful },
		reset
	} = useForm({
		defaultValues: {
			email: ''
		}
	});

	const [formError, setFormError] = useState(null);
	const [validCode, setValidCode] = useState(false);
	const [linkedExpired, setLinkExpired] = useState(null);
	const firebase = useFirebase();

	const [searchParams] = useSearchParams();

	// To get oobCode from URL params
	const oobCode = searchParams.get('oobCode');

	/* Handling Form submission */
	async function onSubmit(data) {
		try {
			await firebase.ResetPassword(data.email);
			toast(CONST.passwordResetEmailSent, {
				position: 'top-right',
				closeButton: true,
				icon: checkCircle,
				style: {
					color: '#666666',
					width: 'max-content'
				}
			});
			setFormError(null);
		} catch (error) {
			setFormError(CONST.somethingWentWrong);
			// console.log('Error: ', error);
		}
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(); //form reset after submission
		}

		if (oobCode) {
			async function unSubscribe() {
				try {
					await firebase.VerifyResetLink(oobCode);

					setValidCode(true);
				} catch (error) {
					if (
						error?.code === 'auth/expired-action-code' ||
						'auth/invalid-action-code'
					) {
						setLinkExpired(true);
					}
					setFormError(CONST.somethingWentWrong);
					// console.log('Error: ', error?.code);
				}
			}
			unSubscribe();
		}
	}, [isSubmitSuccessful, reset, oobCode]);

	/* Handling complete form error */
	function onError() {
		setFormError('Please enter your email.');
	}

	return (
		<>
			{!linkedExpired && !validCode && (
				<div className="w-full max-w-3xl mx-auto p-6">
					<h1 className="text-xl md:text-3xl font-normal font-merriweather mb-2">
						{CONST.serviceRequestForm.forgotPassword}
					</h1>
					<p className="mb-8 text-[#282828]">
						{CONST.serviceRequestForm.enterEmailToReset}
					</p>

					<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
						<div className="grid grid-cols-1 gap-6">
							{/* Email Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="email"
								>
									{CONST.serviceRequestForm.email}
								</label>
								<Controller
									name="email"
									id="email"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											className="shadow-sm"
											type="email"
											placeholder="Enter your email"
											{...field}
										/>
									)}
								/>
							</div>
						</div>

						{/* Submit button */}
						<Button
							type="submit"
							className="w-full font-semibold text-xl rounded-2xl bg-bob-color hover:bg-blue-700 border-bob-border-color border-2 
							text-primary-color py-6 cursor-pointer"
							disabled={isSubmitting}
						>
							{CONST.sendPasswordResetLink}
						</Button>

						{/* If any of the field in the form is not filled then show error */}
						{formError && (
							<p className="text-center text-bob-error-color">{formError}</p>
						)}
					</form>
				</div>
			)}

			{!linkedExpired && validCode && (
				<CreateNewPassword oobCode={oobCode} checkCircle={checkCircle} />
			)}

			{linkedExpired && !validCode && (
				<MessageAfterSubmit
					title={CONST.linkExpiredTitle}
					description={CONST.linkExpiredDescription}
					page="resetPassword"
				/>
			)}
		</>
	);
}
