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
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import SaveDiscardButton from './SaveDiscardButton';
import ReusableLink from '@/components/ReUsable/ReusableLink';

/*** Months for Date Picker ***/
const months = Array.from({ length: 12 }, (_, i) =>
	format(new Date(2024, i, 1), 'MMMM')
);
/*** Years for Date Picker - from 1950 to Current Year ***/
const startYear = 1950;
const currentYear = new Date().getFullYear();
const years = Array.from(
	{ length: currentYear - startYear + 1 },
	(_, i) => startYear + i
);

// Remove once dyanmic through API
const dummyData = {
	firstName: 'Arjun',
	middleName: 'Kumar',
	lastName: 'Thalapathy',
	dateOfBirth: 'Mar 29 2025',
	email: 'ajay@gmaul.com',
	phoneNumber: '1234567890',
	countryOfResidence: 'India'
};

export default function UserProfile() {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
		reset,
		setValue,
		watch
	} = useForm({
		defaultValues: dummyData
	});

	const [originalData, setOriginalData] = useState(dummyData);

	const [formError, setFormError] = useState(null);
	// const selectedDate = watch('dateOfBirth') || new Date();
	const selectedDate = /* watch(dummyData.dateOfBirth) || */ new Date(); // Remove once dyanmic through API
	const [month, setMonth] = useState(selectedDate.getMonth());
	const [year, setYear] = useState(selectedDate.getFullYear());

	// Watch form changes to check if modified
	// const watchFields = watch(); // Watches all fields

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

	/***  Fetch user profile from API ***/
	useEffect(() => {
		async function fetchData() {
			try {
				// const response = await fetch('/api/user-profile'); // Replace with actual API
				// const data = await response.json(); // Replace with actual API

				// setOriginalData(data); // Replace with actual API
				reset(dummyData);
				// reset(data); // Set initial values using react-hook-form's reset
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchData();
	}, [reset]);

	/* Handling Form submission */
	async function onSubmit(data) {
		// Here you would typically send the data to your API
		// await new Promise((resolve) => setTimeout(resolve, 3000));
		console.log('Consoling Data >', data);

		/* Once you get data from API */
		// setOriginalData(data);
		reset(data); // Reset form after saving

		toast(CONST.savedSuccessfully, {
			position: 'top-right',
			closeButton: true,
			icon: <CONST.circleCheck color="green" />
		});
		setFormError(null);
	}

	// useEffect(() => {
	// 	if (isSubmitSuccessful) {
	// 		reset(data); //form reset after submission
	// 	}
	// }, [isSubmitSuccessful, reset]);

	/* Handling complete form error */
	function onError() {
		setFormError(CONST.enterAllFields);
	}

	return (
		<div className="w-full mx-auto p-6">
			<h1 className="text-xl md:text-3xl font-normal font-merriweather mb-4 md:mb-8">
				{CONST.serviceRequestForm.yourProfile}
			</h1>

			<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

				{/* Update Password */}
				<ReusableLink
					to={CONST.updatePassword.href}
					className="text-bob-update-password-link-color font-semibold"
					linkName={CONST.updatePassword.name}
				/>

				{/* Save - Discard Changes Buttons */}
				<div className="flex md:flex-row flex-col md:gap-5">
					<SaveDiscardButton
						btnName="Save Changes"
						disabled={isSubmitting || !isDirty}
						type="submit"
					/>
					<SaveDiscardButton
						btnName="Discard Changes"
						disabled={isSubmitting || !isDirty}
						onClick={() => reset(originalData)}
					/>
				</div>

				{/* If any of the field in the form is not filled then show error */}
				{formError && (
					<p className="text-center text-bob-error-color">{formError}</p>
				)}
			</form>
		</div>
	);
}
