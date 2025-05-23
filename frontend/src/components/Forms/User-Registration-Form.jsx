import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import CONST from '@/utils/Constants';
import PrivacyTermsCheckBox from '../ReUsable/Privacy-Terms-Checkbox';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useFirebase } from '@/context/Firebase-Context';
import MessageAfterSubmit from '../ReUsable/MessageAfterSubmit';
import { useLocation } from 'react-router-dom';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrorHandler';
import API_URL from '../../../environments/Environment-dev';
import axios from 'axios';
import { setUserProfile } from '@/utils/localStorageHelper';

/* Months for Date Picker */
const months = Array.from({ length: 12 }, (_, i) =>
	format(new Date(2024, i, 1), 'MMMM')
);
/* Years for Date Picker - from 1950 to Current Year */
// const years = Array.from({ length: 51 }, (_, i) => currentYear - 50 + i);
const startYear = 1950;
const currentYear = new Date().getFullYear();
const years = Array.from(
	{ length: currentYear - startYear + 1 },
	(_, i) => startYear + i
);

export default function UserRegistrationForm() {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset,
		setValue,
		watch
	} = useForm({
		defaultValues: {
			firstName: '',
			middleName: '',
			lastName: '',
			dateOfBirth: null,
			phoneNumber: '',
			countryOfResidence: '',
			privacyTerms: false
		}
	});

	const [formError, setFormError] = useState(null);
	const [emailVerified, setEmailVerified] = useState(false);
	const selectedDate = watch('dateOfBirth') || new Date();
	const [month, setMonth] = useState(selectedDate.getMonth());
	const [year, setYear] = useState(selectedDate.getFullYear());
	const firebase = useFirebase();
	const location = useLocation();

	const handleMonthChange = (value) => {
		const newMonth = months.indexOf(value);
		setMonth(newMonth);
		setValue('dateOfBirth', new Date(year, newMonth, 1));
	};

	const handleYearChange = (value) => {
		const newYear = parseInt(value);
		setYear(newYear);
		setValue('dateOfBirth', new Date(newYear, month, 1));
	};

	/* Handling Form submission */
	async function onSubmit(data) {
		try {
			// console.log('data >', data);

			const idToken =
				location?.state?.idToken ||
				(await firebase.firebaseAuth.currentUser.getIdToken());

			const userData = {
				idToken: idToken,
				firstName: data.firstName,
				middleName: data.middleName,
				lastName: data.lastName,
				dateOfBirth: data.dateOfBirth,
				phoneNumber: data.phoneNumber,
				countryOfResidence: data.countryOfResidence,
				privacyTerms: data.privacyTerms,
				profileCompleted: true
			};

			/**** Send ID token + user profile data to backend ****/
			await axios.post(`${API_URL}/user-registration`, userData);
			// console.log('response', response);

			const user = firebase.firebaseAuth.currentUser;
			await firebase.EmailVerification(user);

			/***** Set User Profile in Localstorage *****/
			await setUserProfile(API_URL, user.uid);

			setFormError(null);
			setEmailVerified(true);
		} catch (error) {
			if (error?.response.data.message === 'DuplicateKey') {
				setFormError('Looks like a record already exists');
			} else {
				const message = getFirebaseErrorMessage(error?.code);
				setFormError(message);
			}
			// console.log('Error: ', error);
		}
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(); //form reset after submission
		}
	}, [isSubmitSuccessful, reset]);

	/* Handling complete form error */
	function onError() {
		setFormError(CONST.enterAllFields);
	}

	return (
		<>
			{!emailVerified ? (
				<div className="w-full max-w-3xl mx-auto p-6">
					<h1 className="text-xl md:text-3xl font-normal font-merriweather mb-4 md:mb-8">
						{CONST.UserRegistrationForm.tellUsBitMore}
					</h1>

					<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* First Name Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="firstName"
								>
									{CONST.UserRegistrationForm.firstName}
								</label>
								<Controller
									name="firstName"
									id="firstName"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											className={`shadow-sm ${
												errors?.firstName?.type === 'required' &&
												'border-2 border-bob-error-color'
											}`}
											placeholder="Your first name"
											{...field}
										/>
									)}
								/>
							</div>

							{/* Middle Name Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="middleName"
								>
									{CONST.UserRegistrationForm.middleName}
								</label>
								<Controller
									name="middleName"
									id="middleName"
									control={control}
									render={({ field }) => (
										<Input
											className="shadow-sm"
											placeholder="Your middle name"
											{...field}
										/>
									)}
								/>
							</div>

							{/* Last Name Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="lastName"
								>
									{CONST.UserRegistrationForm.lastName}
								</label>
								<Controller
									name="lastName"
									id="lastName"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											className={`shadow-sm ${
												errors?.lastName?.type === 'required' &&
												'border-2 border-bob-error-color'
											}`}
											placeholder="Your last name"
											{...field}
										/>
									)}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* Date Of Birth Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="dateOfBirth"
								>
									{CONST.UserRegistrationForm.dateOfBirth}
								</label>
								<Controller
									name="dateOfBirth"
									id="dateOfBirth"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="bob"
													className={`w-full justify-start text-left shadow-sm ${
														errors?.dateOfBirth?.type === 'required' &&
														'border-2 border-bob-error-color'
													}`}
												>
													{field.value ? (
														format(field.value, 'dd/MM/yyyy')
													) : (
														<span className="text-bob-text-placeholder-color">
															Choose a date
														</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0">
												{/* Month & Year Dropdowns */}
												<div className="flex gap-2 justify-center mt-2">
													<Select value={months[month]} onValueChange={handleMonthChange}>
														<SelectTrigger className="w-[120px]">
															<SelectValue placeholder="Month" />
														</SelectTrigger>
														<SelectContent>
															{months.map((m) => (
																<SelectItem key={m} value={m}>
																	{m}
																</SelectItem>
															))}
														</SelectContent>
													</Select>

													<Select value={year.toString()} onValueChange={handleYearChange}>
														<SelectTrigger className="w-[100px]">
															<SelectValue placeholder="Year" />
														</SelectTrigger>
														<SelectContent>
															{years.map((y) => (
																<SelectItem key={y} value={y.toString()}>
																	{y}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>

												{/* Calendar Component */}
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													month={new Date(year, month)}
													className="rdp-month"
												/>
											</PopoverContent>
										</Popover>
									)}
								/>
							</div>

							{/* Phone Number Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="phoneNumber"
								>
									{CONST.UserRegistrationForm.phoneNumber}
								</label>
								<Controller
									name="phoneNumber"
									id="phoneNumber"
									control={control}
									rules={{ pattern: /^[0-9]{10}$/g }}
									render={({ field }) => (
										<Input
											className={`shadow-sm ${
												errors.phoneNumber?.type === 'pattern'
													? 'border-2 border-bob-error-color'
													: ''
											}`}
											placeholder="Enter your contact number"
											{...field}
										/>
									)}
								/>
								{errors.phoneNumber?.type === 'pattern' && (
									<p className="text-bob-error-color mt-2 text-xs">
										Please enter a valid contact number.
									</p>
								)}
							</div>

							{/* Country Of Residence Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="countryOfResidence"
								>
									{CONST.UserRegistrationForm.countryOfResidence}
								</label>
								<Controller
									name="countryOfResidence"
									id="countryOfResidence"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Select
											onValueChange={(value) => {
												setValue('countryOfResidence', value); //Correctly set the selected value
												field.onChange(value);
											}}
											value={field.value} //Ensure selected value is controlled
										>
											<SelectTrigger
												className={`w-full shadow-sm data-[placeholder]:text-bob-text-placeholder-color ${
													errors.countryOfResidence?.type === 'required' &&
													'border-2 border-bob-error-color'
												} `}
											>
												<SelectValue placeholder="Choose your country" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Country Of Residence</SelectLabel>
													<SelectItem value="USA">USA</SelectItem>
													<SelectItem value="Canada">Canada</SelectItem>
													<SelectItem value="India">India</SelectItem>
													<SelectItem value="Spain">Spain</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
							</div>
						</div>

						{/* Accepting Privacy Terms Checkbox */}
						<PrivacyTermsCheckBox
							control={control}
							name="privacyTerms"
							errors={errors}
							setValue={setValue}
							page="userRegistration"
						/>

						{/* Submit button */}
						<Button
							type="submit"
							className="w-full font-semibold text-xl rounded-2xl bg-bob-color hover:bg-blue-700 border-bob-border-color border-2 text-primary-color py-6 cursor-pointer"
							disabled={isSubmitting}
						>
							{CONST.UserRegistrationForm.finishRegistration}
						</Button>

						{/* If any of the field in the form is not filled then show error */}
						{formError && (
							<p className="text-center text-bob-error-color">{formError}</p>
						)}
					</form>
				</div>
			) : (
				<MessageAfterSubmit
					title={CONST.emailVerificationTitle}
					description={CONST.emailVerificationDescription}
				/>
			)}
		</>
	);
}
