import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import CONST from '@/utils/Constants';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '@/context/Firebase-Context';
import { toast } from 'sonner';

export default function CreateNewPassword({ oobCode, checkCircle }) {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset
	} = useForm({
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	});

	const [formError, setFormError] = useState(null);

	const [passwordCheck, setPasswordCheck] = useState(null);

	const firebase = useFirebase();
	const navigate = useNavigate();

	/* Handling Form submission */
	async function onSubmit(data) {
		if (data.password !== data.confirmPassword) {
			return setFormError(CONST.passwordNotMatch), setPasswordCheck(false);
		}
		try {
			await firebase.CreateNewPasswordLink(oobCode, data.password);
			toast(CONST.passwordResetSuccesfully, {
				position: 'top-right',
				closeButton: true,
				icon: checkCircle
			});
			navigate('/');
		} catch (error) {
			setFormError(CONST.somethingWentWrong);
			// console.log('Error: ', error);
		}
	}

	useEffect(() => {
		if (isSubmitSuccessful && passwordCheck) {
			reset(); //form reset after submission
		}
	}, [isSubmitSuccessful, reset]);

	/* Handling complete form error */
	function onError() {
		setFormError(CONST.enterAllFields);
	}

	return (
		<div className="w-full max-w-3xl mx-auto p-6">
			<h1 className="text-xl md:text-3xl font-normal font-merriweather mb-4 md:mb-8">
				{CONST.serviceRequestForm.createNewPassword}
			</h1>

			<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Password Input */}
					<div className="flex flex-col">
						<label className="font-medium text-sm text-bob-form-label-color" htmlFor="password">
							{CONST.serviceRequestForm.password}
						</label>
						<Controller
							name="password"
							id="password"
							control={control}
							rules={{
								required: true,
								minLength: 8
							}}
							render={({ field }) => (
								<Input
									type="password"
									className={`shadow-sm ${
										errors?.password?.type === 'required' ? 'border-bob-error-color' : ''
									}`}
									placeholder="Create a password"
									{...field}
								/>
							)}
						/>
						{errors?.password?.type === 'minLength' && (
							<p className="text-sm text-bob-error-color mt-4">
								{CONST.passwordMinLength}
							</p>
						)}
					</div>

					{/* Confirm Password Input */}
					<div className="flex flex-col">
						<label
							className="font-medium text-sm text-bob-form-label-color"
							htmlFor="confirmPassword"
						>
							{CONST.serviceRequestForm.confirmPassword}
						</label>
						<Controller
							name="confirmPassword"
							id="confirmPassword"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									type="password"
									className={`shadow-sm ${
										errors?.confirmPassword?.type === 'required' || passwordCheck == false
											? 'border-bob-error-color'
											: ''
									}`}
									placeholder="Confirm password"
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
					Confirm
				</Button>

				{/* If any of the field in the form is not filled then show error */}
				{formError && (
					<p className="text-center text-bob-error-color">{formError}</p>
				)}
			</form>
		</div>
	);
}
