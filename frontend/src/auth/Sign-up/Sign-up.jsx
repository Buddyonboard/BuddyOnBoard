import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CONST from '@/utils/Constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFirebase } from '@/context/Firebase-Context';
import { toast } from 'sonner';
import GoogleSignInButton from '../Google-Auth/GoogleSignInButton';
import FacebookSignInButton from '../Facebook-Auth/FacebookSignInButton';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrorHandler';

export default function SignUp() {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: ''
		}
	});

	const [formError, setFormError] = useState(null);
	const [passwordCheck, setPasswordCheck] = useState(null);
	const firebase = useFirebase();
	const navigate = useNavigate();
	const location = useLocation();
	const pathName = location.pathname.split('/')[1];

	/* Handling Form submission */
	async function onSubmit(data) {
		if (data.password !== data.confirmPassword) {
			return setFormError(CONST.passwordNotMatch), setPasswordCheck(false);
		}
		try {
			const userDetails = await firebase.SignupAuthentication(
				data.email,
				data.password
			);
			const idToken = await userDetails.user.getIdToken();

			toast(CONST.signupSuccessfull, {
				position: 'top-right',
				closeButton: true
			});
			setFormError(null);

			navigate('/user-registration', { replace: true, state: { idToken } });
		} catch (error) {
			const message = getFirebaseErrorMessage(error?.code);
			setFormError(message);
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
		<>
			<div className="w-full max-w-3xl mx-auto p-6">
				<h1 className="text-xl md:text-3xl font-normal font-merriweather mb-4 md:mb-8">
					{CONST.LANDING[0].signupSection.name}
				</h1>

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
										className={`shadow-sm ${
											errors?.email?.type === 'required' ? 'border-bob-error-color' : ''
										}`}
										type="email"
										placeholder="Enter your email"
										{...field}
									/>
								)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Password Input */}
						<div className="flex flex-col">
							<label
								className="font-medium text-sm text-bob-form-label-color"
								htmlFor="password"
							>
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
											errors?.confirmPassword?.type === 'required' ||
											passwordCheck == false
												? 'border-bob-error-color'
												: ''
										}`}
										placeholder="Confirm password"
										{...field}
									/>
								)}
							/>
							{formError === CONST.passwordNotMatch && (
								<p className="text-sm text-bob-error-color mt-4">{formError}</p>
							)}
						</div>
					</div>

					{/* Submit button */}
					<Button
						type="submit"
						className="w-full font-semibold text-xl rounded-2xl bg-bob-color hover:bg-blue-700 border-bob-border-color border-2 
                    text-primary-color py-6 cursor-pointer"
						disabled={isSubmitting}
					>
						{CONST.LANDING[0].createAccount}
					</Button>

					{/* If any of the field in the form is not filled then show error */}
					{formError !== CONST.passwordNotMatch && (
						<p className="text-center text-bob-error-color">{formError}</p>
					)}

					{/* Sign-in Link */}
					<p className="font-normal text-center text-sm text-bob-link-placeholder-color">
						Already have an account?{' '}
						<Link
							to={CONST.LANDING[0].loginSection.href}
							className="text-bob-color font-extrabold"
						>
							{CONST.LANDING[0].loginSection.name}
						</Link>
					</p>
				</form>

				{/*** Social Logins ***/}
				<div className="flex md:flex-row flex-col justify-center">
					<GoogleSignInButton pathName={pathName} />
					<FacebookSignInButton pathName={pathName} />
				</div>
			</div>
		</>
	);
}
