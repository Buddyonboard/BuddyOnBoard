import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useForm, Controller } from 'react-hook-form';
import AirportSearchDropdown from '../AirportSelectionDropdown';
import DateSelection from '../DateSelection';
import { toast } from 'sonner';
import CONST from '@/utils/Constants';
import ListingPricingHelpAccordion from '../Travel-Listing-Form/Step-3/ListingPricingHelpAccordion';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';

export default function CourierBuddyListingForm() {
	const [airportFromSelected, setAirportFromSelected] = useState(null);
	const [airportToSelected, setAirportToSelected] = useState(null);
	const [currentStep, setCurrentStep] = useState(1);
	const [formError, setFormError] = useState(null);

	const {
		handleSubmit,
		control,
		setValue,
		trigger,
		formState: { errors }
	} = useForm({
		defaultValues: {
			airline: '',
			departureAirport: '',
			departureDate: '',
			departureTime: '',
			arrivalAirport: '',
			arrivalDate: '',
			arrivalTime: '',
			courierPreferences: [],
			description: '',
			documentPrice1: '',
			documentPrice2: '',
			documentPrice3: '',
			clothesPrice1: '',
			clothesPrice2: '',
			clothesPrice3: '',
			electronicsPrice1: '',
			electronicsPrice2: '',
			electronicsPrice3: '',
			acceptCourierTerms: ''
		}
	});

	/****** Each Step Field Names For Validation ******/
	const stepFields = {
		1: [
			'airline',
			'departureAirport',
			'departureDate',
			'departureTime',
			'arrivalAirport',
			'arrivalDate',
			'arrivalTime'
		],
		2: ['courierPreferences'],
		3: [
			'documentPrice1',
			'documentPrice2',
			'documentPrice3',
			'clothesPrice1',
			'clothesPrice2',
			'clothesPrice3',
			'electronicsPrice1',
			'electronicsPrice2',
			'electronicsPrice3'
		],
		4: ['acceptCourierTerms']
	};

	const requiredFlag = true; // To set required field flag in the form

	/********* Handle Form Submission *********/
	const onSubmit = (data) => {
		console.log('Submitted Data:', data);
	};

	/********* Handle Progress Tracker *********/
	const totalSteps = 5;
	const progress = (currentStep / totalSteps) * 100;

	/********* Handle Next Step Functionality *********/
	const nextStep = async () => {
		const valid = await trigger(stepFields[currentStep]);
		if (!valid) {
			setFormError('Please fill all the required fields');
			return;
		}

		if (
			airportFromSelected === airportToSelected &&
			airportFromSelected &&
			airportToSelected
		) {
			toast.warning(CONST.buddySearch.fromAndToSameValue, {
				position: 'top-right',
				closeButton: true,
				style: {
					backgroundColor: 'red',
					color: 'white'
				}
			});

			// Don't proceed to next step if airports are same
			return;
		}
		// Clear error immediately once form becomes valid
		setFormError(null);

		if (currentStep < totalSteps) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	/********* Handle Previous Step Functionality *********/
	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	/********************* 1. Travel Detials Step ***********************/
	const renderStep1 = () => (
		<div className="space-y-6">
			{/************* Airline Details ***********/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Add Your Airline
				</h2>

				<label
					htmlFor="airline"
					className="text-sm lg:text-base 2xl:text-xl font-medium
					text-bob-search-input-label-color"
				>
					Airline that issued your tickets*
				</label>
				<Controller
					name="airline"
					id="airline"
					control={control}
					rules={{ required: requiredFlag }}
					render={({ field }) => (
						<Input
							className={`mt-2 shadow-sm ${
								errors?.firstName?.type === 'required' &&
								'border-2 border-bob-error-color'
							}`}
							placeholder="Your Airline Name"
							{...field}
						/>
					)}
				/>
			</div>

			{/************* Departure Details ************/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Departure
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/*** Departure Airport ***/}
					<div>
						<label
							htmlFor="departureAirport"
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color"
						>
							Airport*
						</label>
						<Controller
							id="departureAirport"
							name="departureAirport"
							control={control}
							rules={{ required: requiredFlag }}
							render={({ field }) => (
								<AirportSearchDropdown
									{...field}
									errors={errors} // includes value and onChange
									setAirportFromSelected={setAirportFromSelected}
								/>
							)}
						/>
					</div>

					{/*** Departure Date ***/}
					<div>
						<label
							htmlFor="departureDate"
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color"
						>
							Date*
						</label>
						<Controller
							id="departureDate"
							name="departureDate"
							control={control}
							rules={{ required: requiredFlag }}
							render={({ field }) => (
								<DateSelection setDate={field.onChange} date={field.value} />
							)}
						/>
					</div>

					{/*** Time of Departure ***/}
					<div>
						<label
							htmlFor="departureTime"
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color"
						>
							Time*
						</label>
						<Controller
							id="departureTime"
							name="departureTime"
							control={control}
							rules={{ required: requiredFlag }}
							render={({ field }) => (
								<Input
									type="time"
									{...field} // handles value & onChange
									className="mt-1"
								/>
							)}
						/>
					</div>
				</div>
			</div>

			{/************ Arrival Details *************/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Arrival
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/*** Arrival Airport ***/}
					<div>
						<Label
							htmlFor="arrivalAirport"
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color"
						>
							Airport*
						</Label>
						<Controller
							id="arrivalAirport"
							name="arrivalAirport"
							control={control}
							rules={{ required: requiredFlag }}
							render={({ field }) => (
								<AirportSearchDropdown
									{...field}
									errors={errors} // includes value and onChange
									setAirportToSelected={setAirportToSelected}
								/>
							)}
						/>
					</div>

					{/*** Arrival Date ***/}
					<div>
						<Label
							htmlFor="arrivalDate"
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color"
						>
							Date*
						</Label>
						<Controller
							id="arrivalDate"
							name="arrivalDate"
							control={control}
							rules={{ required: requiredFlag }}
							render={({ field }) => (
								<DateSelection setDate={field.onChange} date={field.value} />
							)}
						/>
					</div>

					{/*** Time of Arrival ***/}
					<div>
						<Label
							htmlFor="arrivalTime"
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color"
						>
							Time*
						</Label>
						<Controller
							id="arrivalTime"
							name="arrivalTime"
							control={control}
							rules={{ required: requiredFlag }}
							render={({ field }) => (
								<Input
									type="time"
									{...field} // handles value & onChange
									className="mt-1"
								/>
							)}
						/>
					</div>
				</div>
			</div>

			{formError && (
				<p className="text-center mt-10 text-bob-error-color">{formError}</p>
			)}
		</div>
	);

	/********************* 2. Courier Preferences Step ***********************/
	const renderStep2 = () => (
		<div className="space-y-6">
			{/********* Travel Preferences *********/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Add your courier preferences*
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Controller
						name="courierPreferences"
						control={control}
						rules={{ required: requiredFlag }}
						render={({ field }) => {
							const COURIER_OPTIONS = [
								'Documents',
								'Clothes',
								'Electronics (Open box with invoice)',
								'Electronics (Open box without invoice)'
							];

							const { value, onChange } = field;

							const toggleOption = (option) => {
								if (value.includes(option)) {
									onChange(value.filter((item) => item !== option));
								} else {
									onChange([...value, option]);
								}
							};

							return (
								<div className="flex flex-col gap-3">
									{COURIER_OPTIONS.map((option) => (
										<label
											key={option}
											className="flex items-center space-x-2 text-sm sm:text-base cursor-pointer"
										>
											<Checkbox
												checked={value.includes(option)}
												onCheckedChange={() => toggleOption(option)}
												className="text-primary-color 
												data-[state=checked]:bg-bob-color 
												border-secondary-color cursor-pointer"
											/>
											<span className="text-bob-filters-placeholder-color">{option}</span>
										</label>
									))}
								</div>
							);
						}}
					/>
				</div>
			</div>

			{/********* Buddy About Section *********/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Tell us a bit about yourself
				</h2>
				<Controller
					id="description"
					name="description"
					control={control}
					rules={{
						maxLength: {
							value: 500,
							message: 'Description cannot exceed 1000 characters'
						}
					}}
					render={({ field }) => (
						<>
							<Textarea
								{...field}
								className="min-h-[120px] resize-none"
								maxLength={500}
								placeholder="Write about your travel experience, interests, etc."
							/>

							<p className="text-sm text-bob-accordion-content-color mt-1">
								{field.value?.length || 0}/500 characters
							</p>
						</>
					)}
				/>
			</div>

			{formError && (
				<p className="text-center mt-10 text-bob-error-color">{formError}</p>
			)}
		</div>
	);

	/********************* 3. Courier Preferences Pricing Step ***********************/
	const renderStep3 = () => (
		<div className="space-y-6">
			{/********* Documents Pricing Details *********/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Set your pricing for documents
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/*** Price 1 ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Below 500 grams*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="documentPrice1"
								id="documentPrice1"
								control={control}
								rules={{ required: requiredFlag, pattern: /^[0-9]{1,4}$/ }}
								render={({ field }) => (
									<Input
										className={`mt-2 pl-8 shadow-sm ${
											errors?.firstName?.type === 'required' &&
											'border-2 border-bob-error-color'
										}`}
										{...field}
										placeholder="50"
										minLength={1}
										maxLength={4}
									/>
								)}
							/>
						</div>
					</div>

					{/***  Price 2 ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Above 500 grams, but below 1000 grams*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="documentPrice2"
								id="documentPrice2"
								control={control}
								rules={{ required: requiredFlag, pattern: /^[0-9]{1,4}$/ }}
								render={({ field }) => (
									<Input
										className={`mt-2 pl-8 shadow-sm ${
											errors?.firstName?.type === 'required' &&
											'border-2 border-bob-error-color'
										}`}
										{...field}
										placeholder="50"
										minLength={1}
										maxLength={4}
									/>
								)}
							/>
						</div>
					</div>

					{/***  Price 3 ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Above 1000 grams*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="documentPrice3"
								id="documentPrice3"
								control={control}
								rules={{ required: requiredFlag, pattern: /^[0-9]{1,4}$/ }}
								render={({ field }) => (
									<Input
										className={`mt-2 pl-8 shadow-sm ${
											errors?.firstName?.type === 'required' &&
											'border-2 border-bob-error-color'
										}`}
										{...field}
										placeholder="50"
										minLength={1}
										maxLength={4}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>

			{/********* Clothes Pricing Details *********/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Set your pricing for clothes
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/*** Price 1 ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Below 1000 grams*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="clothesPrice1"
								id="clothesPrice1"
								control={control}
								rules={{ required: requiredFlag, pattern: /^[0-9]{1,4}$/ }}
								render={({ field }) => (
									<Input
										className={`mt-2 pl-8 shadow-sm ${
											errors?.firstName?.type === 'required' &&
											'border-2 border-bob-error-color'
										}`}
										{...field}
										placeholder="50"
										minLength={1}
										maxLength={4}
									/>
								)}
							/>
						</div>
					</div>

					{/*** Price 2 ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Above 1000 grams, but below 3000 grams*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="clothesPrice2"
								id="clothesPrice2"
								control={control}
								rules={{ required: requiredFlag, pattern: /^[0-9]{1,4}$/ }}
								render={({ field }) => (
									<Input
										className={`mt-2 pl-8 shadow-sm ${
											errors?.firstName?.type === 'required' &&
											'border-2 border-bob-error-color'
										}`}
										{...field}
										placeholder="50"
										minLength={1}
										maxLength={4}
									/>
								)}
							/>
						</div>
					</div>

					{/*** Price 3 ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Above 3000 grams*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="clothesPrice3"
								id="clothesPrice3"
								control={control}
								rules={{ required: requiredFlag, pattern: /^[0-9]{1,4}$/ }}
								render={({ field }) => (
									<Input
										className={`mt-2 pl-8 shadow-sm ${
											errors?.firstName?.type === 'required' &&
											'border-2 border-bob-error-color'
										}`}
										{...field}
										placeholder="50"
										minLength={1}
										maxLength={4}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>

			{/********* Electronics Pricing Details *********/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Set your pricing for electronics
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/*** Price 1 ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Below 1000 grams*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="electronicsPrice1"
								id="electronicsPrice1"
								control={control}
								rules={{ required: requiredFlag, pattern: /^[0-9]{1,4}$/ }}
								render={({ field }) => (
									<Input
										className={`mt-2 pl-8 shadow-sm ${
											errors?.firstName?.type === 'required' &&
											'border-2 border-bob-error-color'
										}`}
										{...field}
										placeholder="50"
										minLength={1}
										maxLength={4}
									/>
								)}
							/>
						</div>
					</div>

					{/*** Price 2 ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Above 1000 grams, but below 3000 grams*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="electronicsPrice2"
								id="electronicsPrice2"
								control={control}
								rules={{ required: requiredFlag, pattern: /^[0-9]{1,4}$/ }}
								render={({ field }) => (
									<Input
										className={`mt-2 pl-8 shadow-sm ${
											errors?.firstName?.type === 'required' &&
											'border-2 border-bob-error-color'
										}`}
										{...field}
										placeholder="50"
										minLength={1}
										maxLength={4}
									/>
								)}
							/>
						</div>
					</div>

					{/*** Price 3 ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Above 3000 grams*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="electronicsPrice3"
								id="electronicsPrice3"
								control={control}
								rules={{ required: requiredFlag, pattern: /^[0-9]{1,4}$/ }}
								render={({ field }) => (
									<Input
										className={`mt-2 pl-8 shadow-sm ${
											errors?.firstName?.type === 'required' &&
											'border-2 border-bob-error-color'
										}`}
										{...field}
										placeholder="50"
										minLength={1}
										maxLength={4}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>

			{/************* Need Help With Pricing Accordion ************/}
			<ListingPricingHelpAccordion serviceType="courier" />

			<div className="space-y-2 text-sm text-bob-search-input-label-color font-bold">
				<p>
					• Please note, Buddy on Board charges standard 3% payment processing fee on
					all transactions.
				</p>
				<p>
					• Important: Ensure you set up your Stripe account before publishing your
					listing. Please refer to our FAQs for instructions
				</p>
			</div>

			{formError && (
				<p className="text-center mt-10 text-bob-error-color">{formError}</p>
			)}
		</div>
	);

	/********************* 4. Accept Courier Services Terms ***********************/
	const renderStep4 = () => (
		<div className="text-left space-y-6 pt-8">
			<div className="space-y-4">
				<h2 className="text-2xl md:text-3xl 2xl:text-5xl font-normal font-merriweather text-bob-tiles-text-color">
					Before you proceed, please review and acknowledge the following:
				</h2>

				<p
					className="text-bob-buddy-listing-accordion-color font-normal text-base 
					md:text-xl 2xl:text-2xl"
				>
					As a Courier Buddy, you agree to carry only documents and clearly
					permissible items such as clothes and light electronics, preferably
					accompanied by a valid invoice.
				</p>

				<p
					className="text-bob-buddy-listing-accordion-color font-normal text-base 
					md:text-xl 2xl:text-2xl"
				>
					Transporting restricted or prohibited items is strictly not allowed. By
					continuing, you acknowledge that you assume full responsibility and
					liability in the event of any issues with law enforcement, airline staff,
					or immigration authorities related to the items you are carrying.
				</p>
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex flex-row gap-4 items-center">
					<Controller
						name="acceptCourierTerms"
						id="acceptCourierTerms"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Checkbox
								checked={field.value} //Correctly control checked state
								onCheckedChange={(checked) => {
									setValue('acceptCourierTerms', checked); //Update form state
									field.onChange(checked);
								}}
								className="border border-bob-outline-color 
								data-[state=checked]:bg-bob-color cursor-pointer"
							/>
						)}
					/>
					<label
						className="font-medium text-sm text-bob-link-placeholder-color"
						htmlFor="acceptCourierTerms"
					>
						I have read and understood the above, and I accept full liability for the
						items I choose to carry.
					</label>
				</div>

				{errors?.acceptCourierTerms?.type === 'required' && (
					<p className="text-center text-bob-error-color">
						Please accept the terms of service to confirm registration.
					</p>
				)}
			</div>
		</div>
	);

	/********************* 5. Form Submission Success Step ***********************/
	const renderStep5 = () => (
		<div className="text-center space-y-6 pt-8">
			<div className="space-y-4">
				<h2 className="text-2xl md:text-3xl 2xl:text-5xl font-normal font-merriweather text-bob-tiles-text-color">
					Awesome! Your listing is live.
				</h2>

				<p className="text-secondary-color font-normal text-lg md:text-2xl 2xl:text-4xl">
					Sit back and relax, while buddies discover your listing and send you a
					request.
				</p>
			</div>

			<div className="space-y-4 2xl:max-w-xl max-w-md mx-auto">
				<Link to="/buddy-dashboard">
					<Button
						className="w-full border-2 border-bob-border-color bg-bob-color text-primary-color font-semibold rounded-2xl md:px-10 px-0 2xl:py-7 2xl:text-2xl
						cursor-pointer mt-5"
					>
						Go back to dashboard
					</Button>
				</Link>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen">
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
				{/****************** Page Title ******************/}
				<div className="mb-4 md:mb-8 w-full space-y-4">
					{currentStep < 4 && (
						<>
							<h1 className="text-2xl md:text-3xl 2xl:text-5xl font-normal text-bob-tiles-text-color font-merriweather">
								Create your courier buddy listing
							</h1>

							<p className="text-bob-tabs-text-color font-normal 2xl:text-2xl md:text-xl">
								{currentStep === 1 && 'Add your travel details before you proceed.'}
								{currentStep === 2 && 'Add your Courier preferences.'}
								{currentStep === 3 && 'Add your pricing preferences before publishing.'}
							</p>
						</>
					)}
				</div>

				{/******************* Form Input Section ********************/}
				<form onSubmit={handleSubmit(onSubmit)}>
					{currentStep !== 5 && (
						<Card className="w-full shadow-md">
							<CardContent className="pb-6">
								{currentStep === 1 && renderStep1()}
								{currentStep === 2 && renderStep2()}
								{currentStep === 3 && renderStep3()}
								{currentStep === 4 && renderStep4()}
							</CardContent>
						</Card>
					)}

					{/***** Post Form Submission Success Message *****/}
					{currentStep === 5 && renderStep5()}

					{/***************** Action Buttons *****************/}
					<div
						className={`flex flex-col sm:flex-row justify-evenly items-center sm:gap-2 gap-5 py-6 ${
							currentStep === 5 && 'hidden'
						}`}
					>
						<Button
							type="button"
							onClick={prevStep}
							disabled={currentStep === 1}
							className="w-full sm:w-auto order-1 border-2 border-bob-border-color bg-primary-color text-bob-color font-semibold rounded-lg md:px-10 px-0 2xl:py-7 2xl:text-2xl"
						>
							Back
						</Button>

						<div className="space-y-2 w-full sm:order-2 order-3">
							<Progress value={progress} className="w-full" />
						</div>

						<Button
							type={currentStep < 5 ? 'button' : 'submit'}
							onClick={nextStep}
							className="w-full sm:w-auto order-2 sm:order-3 border-2 border-bob-border-color text-primary-color bg-bob-color 
								font-semibold rounded-lg md:px-10 px-0 2xl:py-7 2xl:text-2xl"
						>
							{currentStep === 5 ? 'Submit' : 'Next'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
