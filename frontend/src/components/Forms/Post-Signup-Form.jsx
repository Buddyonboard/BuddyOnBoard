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

export default function PostSignupForm() {
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
	const selectedDate = watch('dateOfBirth') || new Date();
	const [month, setMonth] = useState(selectedDate.getMonth());
	const [year, setYear] = useState(selectedDate.getFullYear());

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
		// Here you would typically send the data to your API
		await new Promise((resolve) => setTimeout(resolve, 3000));
		// console.log('Consoling Data >', data);

		setFormError(null);
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(); //form reset after submission
		}
	}, [isSubmitSuccessful, reset]);

	/* Handling complete form error */
	function onError() {
		setFormError('Please enter all fields correctly.');
	}

	return (
		<div className="w-full max-w-3xl mx-auto p-6">
			<h1 className="text-xl md:text-3xl font-normal font-merriweather mb-4 md:mb-8">
				{CONST.postSignUpForm.tellUsBitMore}
			</h1>

			<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* First Name Input */}
					<div className="flex flex-col">
						<label className="font-medium text-sm text-[#414651]" htmlFor="firstName">
							{CONST.postSignUpForm.firstName}
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
							className="font-medium text-sm text-[#414651]"
							htmlFor="middleName"
						>
							{CONST.postSignUpForm.middleName}
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
						<label className="font-medium text-sm text-[#414651]" htmlFor="lastName">
							{CONST.postSignUpForm.lastName}
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
							className="font-medium text-sm text-[#414651]"
							htmlFor="dateOfBirth"
						>
							{CONST.postSignUpForm.dateOfBirth}
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
							className="font-medium text-sm text-[#414651]"
							htmlFor="phoneNumber"
						>
							{CONST.postSignUpForm.phoneNumber}
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
							className="font-medium text-sm text-[#414651]"
							htmlFor="countryOfResidence"
						>
							{CONST.postSignUpForm.countryOfResidence}
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
					{CONST.postSignUpForm.finishRegistration}
				</Button>

				{/* If any of the field in the form is not filled then show error */}
				{formError && (
					<p className="text-center text-bob-error-color">{formError}</p>
				)}
			</form>
		</div>
	);
}
