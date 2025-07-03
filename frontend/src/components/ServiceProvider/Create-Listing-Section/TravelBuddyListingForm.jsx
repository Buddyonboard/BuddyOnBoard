import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Minus, Plus } from 'lucide-react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import AirportSearchDropdown from './AirportSelectionDropdown';
import DateSelection from './DateSelection';
import { toast } from 'sonner';
import CONST from '@/utils/Constants';
import CompanionPreference from './Travel-Listing-Form/Step-2/CompanionPreference';
import ListingPricingHelpAccordion from './Travel-Listing-Form/Step-3/ListingPricingHelpAccordion';
import TravelAssistOptions from './Travel-Listing-Form/Step-2/TravelAssistOptions';
import LanguageSelection from './Travel-Listing-Form/Step-2/LanguageSelection';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getuserProfile } from '@/utils/localStorageHelper';
import API_URL from '../../../../environments/Environment-dev';
import axios from 'axios';

export default function TravelBuddyListingForm() {
	const [airportFromSelected, setAirportFromSelected] = useState(null);
	const [airportToSelected, setAirportToSelected] = useState(null);
	const [airportStopSelected, setAirportStopSelected] = useState([]);
	const [currentStep, setCurrentStep] = useState(1);
	const [formError, setFormError] = useState(null);

	const { id } = useParams();
	const { pathname } = useLocation();
	const mode = pathname.split('/')[1];

	const {
		handleSubmit,
		control,
		watch,
		setValue,
		getValues,
		trigger,
		reset,
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
			stops: 0,
			stopAirports: [],
			travelAssitanceOptions: '',
			companionPreference: '',
			language1: '',
			language2: '',
			language3: '',
			description: '',
			price1: '',
			price2: '',
			price3: ''
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
			'arrivalTime',
			'stopAirports'
		],
		2: ['travelAssitanceOptions', 'companionPreference', 'language1'],
		3: ['price1', 'price2', 'price3']
	};

	const requiredFlag = true; // To set required field flag in the form

	/********* Handle Form Submission *********/
	const onSubmit = async (data) => {
		const user_id = getuserProfile()._id;

		const formData = {
			...data,
			serviceType: 'Travel Buddy',
			listingStatus: 'active',
			user_id: user_id
		};

		if (mode === 'edit-listing' && id) {
			const editedFormData = {
				...data,
				serviceType: 'Travel Buddy',
				user_id: user_id,
				listing_id: id
			};

			/**** API to Update Listing data in backend ****/
			await axios.post(`${API_URL}/edit-Buddy-Listing`, editedFormData);
		} else {
			/**** Send ID token + user profile data to backend ****/
			await axios.post(`${API_URL}/buddy-listings-registration`, formData);
		}
	};

	/***************** Handling Airport Stops **********************/
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'stopAirports'
	});
	const stops = watch('stops') || 0;

	useEffect(() => {
		const currentFields = getValues('stopAirports') || [];

		if (stops > currentFields.length) {
			for (let i = currentFields.length; i < stops; i++) {
				append('');
			}
		} else if (stops < currentFields.length) {
			for (let i = currentFields.length - 1; i >= stops; i--) {
				remove(i);
			}
		}
	}, [stops]);

	const handleStopsChange = (newStops) => {
		const clampedStops = Math.max(0, Math.min(2, newStops));
		setValue('stops', clampedStops);

		const currentStops = getValues('stopAirports') || [];
		const newArray = Array.from(
			{ length: clampedStops },
			(_, i) => currentStops[i] || ''
		);
		setValue('stopAirports', newArray);
	};

	/********** Edit Listing Logic ************/
	useEffect(() => {
		const fetchBuddyListing = async () => {
			const user_id = getuserProfile()._id;

			try {
				const response = await axios.get(`${API_URL}/getBuddyListings/${user_id}`);

				const buddyListingData = response.data.data.buddy_Listing_Details;

				/***** Segregate based on listing type ****/
				const travel = Array.isArray(buddyListingData?.travel_listing)
					? buddyListingData.travel_listing
					: [];
				const courier = Array.isArray(buddyListingData?.courier_listing)
					? buddyListingData.courier_listing
					: [];

				/**** Combine Data of Travel and Courier Listing ****/
				const combinedData = [...travel, ...courier];

				/******* Filter Data based on listing id ********/
				const filtered = combinedData.filter((item) => item.listing_id === `${id}`);

				reset(filtered[0]);
				setAirportFromSelected(filtered[0].departureAirport);
				setAirportToSelected(filtered[0].arrivalAirport);
				setAirportStopSelected(filtered[0].stopAirports);
			} catch (error) {
				// console.error('Error fetching listings:', error);
			}
		};

		if (mode === 'edit-listing' && id) {
			fetchBuddyListing();
		}
	}, [id, mode, reset]);

	/********* Handle Progress Tracker *********/
	const totalSteps = 4;
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
									airportFromSelected={airportFromSelected}
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
									airportToSelected={airportToSelected}
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

			{/************* Stops Details **************/}
			<div>
				<div className="flex flex-row justify-between items-center">
					<Label className="2xl:text-lg md:text-base text-sm text-bob-form-label-color font-medium">
						How many stops does your trip have?
					</Label>

					<div className="flex items-center gap-4">
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => handleStopsChange(stops - 1)}
							disabled={stops <= 0}
							className="h-8 w-8 rounded-full"
						>
							<Minus className="h-4 w-4" />
						</Button>

						<span className="text-lg font-medium w-8 text-center">{stops}</span>

						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => handleStopsChange(stops + 1)}
							disabled={stops >= 2}
							className="h-8 w-8 rounded-full"
						>
							<Plus className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/**** Airport Stops Details ****/}
				{stops > 0 && (
					<div className="space-y-4 mt-6">
						{fields.map((field, index) => (
							<div key={field.id} className="pb-4">
								<h4 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-3 text-bob-search-input-label-color">
									{index === 0 ? 'First Stop' : 'Second Stop'}
								</h4>
								<div>
									<Label
										htmlFor={`stopAirports.${index}`}
										className="text-sm lg:text-base 2xl:text-xl font-medium
										text-bob-search-input-label-color"
									>
										Airport*
									</Label>
									<Controller
										id={`stopAirports.${index}`}
										name={`stopAirports.${index}`}
										control={control}
										rules={{ required: requiredFlag }}
										render={({ field }) => (
											<AirportSearchDropdown
												{...field}
												errors={errors} // includes value and onChange
												setAirportStopSelected={setAirportStopSelected}
												airportStopSelected={airportStopSelected?.[index]}
												index={index}
											/>
										)}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{formError && (
				<p className="text-center mt-10 text-bob-error-color">{formError}</p>
			)}
		</div>
	);

	/********************* 2. Travel Preferences Step ***********************/
	const renderStep2 = () => (
		<div className="space-y-6">
			{/********* Travel Preferences *********/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Add your travel preferences
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/**** Assist Travellers With ****/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Can assist the travelers with:*
						</Label>
						<Controller
							id="travelAssitanceOptions"
							name="travelAssitanceOptions"
							control={control}
							rules={{ required: requiredFlag }}
							render={({ field }) => (
								<TravelAssistOptions value={field.value} onChange={field.onChange} />
							)}
						/>
					</div>

					{/**** Comfortable accompanying ****/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Comfortable accompanying:*
						</Label>
						<Controller
							id="companionPreference"
							name="companionPreference"
							control={control}
							rules={{ required: requiredFlag }}
							render={({ field }) => (
								<CompanionPreference value={field.value} onChange={field.onChange} />
							)}
						/>
					</div>
				</div>
			</div>

			{/*********** Languages Preferences ************/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Languages you speak (add up to 3)
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/**** Language Option 1 ****/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Language 1*
						</Label>
						<Controller
							id="language1"
							name="language1"
							control={control}
							rules={{ required: requiredFlag }}
							render={({ field }) => (
								<LanguageSelection value={field.value} onChange={field.onChange} />
							)}
						/>
					</div>

					{/**** Language Option 2 ****/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Language 2
						</Label>
						<Controller
							id="language2"
							name="language2"
							control={control}
							// rules={{ required: true }}
							render={({ field }) => (
								<LanguageSelection value={field.value} onChange={field.onChange} />
							)}
						/>
					</div>

					{/**** Language Option 3 ****/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							Language 3
						</Label>
						<Controller
							id="language3"
							name="language3"
							control={control}
							// rules={{ required: true }}
							render={({ field }) => (
								<LanguageSelection value={field.value} onChange={field.onChange} />
							)}
						/>
					</div>
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

	/********************* 3. Travel Pricing Step ***********************/
	const renderStep3 = () => (
		<div className="space-y-6">
			{/********* Traveller Pricing Details *********/}
			<div>
				<h2 className="text-xl 2xl:text-3xl md:text-2xl font-semibold mb-2 text-bob-search-input-label-color">
					Set your pricing based on group size
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/*** 1 Traveller Price ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							1 Traveler*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="price1"
								id="price1"
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

					{/*** 2 Traveller Price ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							2 Travelers*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="price2"
								id="price2"
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

					{/*** 3 Traveller Price ***/}
					<div>
						<Label
							className="text-sm lg:text-base 2xl:text-xl font-medium
							text-bob-search-input-label-color block"
						>
							3 Travelers*
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bob-search-input-label-color block">
								$
							</span>
							<Controller
								name="price3"
								id="price3"
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
			<ListingPricingHelpAccordion serviceType="travel" />

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

	/********************* 4. Form Submission Success Step ***********************/
	const renderStep4 = () => (
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
				<Link to="/create-listing/courier-buddy-form">
					<Button
						className="w-full border-2 border-bob-border-color bg-bob-color text-primary-color font-semibold rounded-2xl md:px-10 px-0 2xl:py-7
						2xl:text-2xl cursor-pointer"
					>
						Create a courier buddy listing
					</Button>
				</Link>

				<Link to="/buddy-dashboard">
					<Button
						variant="outline"
						className="w-full border-2 border-bob-border-color bg-primary-color text-bob-color font-semibold rounded-2xl md:px-10 px-0 2xl:py-7 2xl:text-2xl
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
								Create your travel buddy listing
							</h1>

							<p className="text-bob-tabs-text-color font-normal 2xl:text-2xl md:text-xl">
								{currentStep === 1 && 'Add your travel details before you proceed.'}
								{currentStep === 2 &&
									'Add your preferences so that we can match you with the right travelers!'}
								{currentStep === 3 && 'Add your pricing preferences before publishing.'}
							</p>
						</>
					)}
				</div>

				{/******************* Form Input Section ********************/}
				<form onSubmit={handleSubmit(onSubmit)}>
					{currentStep !== 4 && (
						<Card className="w-full shadow-md">
							<CardContent className="pb-6">
								{currentStep === 1 && renderStep1()}
								{currentStep === 2 && renderStep2()}
								{currentStep === 3 && renderStep3()}
							</CardContent>
						</Card>
					)}

					{/***** Post Form Submission Success Message *****/}
					{currentStep === 4 && renderStep4()}

					{/***************** Action Buttons *****************/}
					<div
						className={`flex flex-col sm:flex-row justify-evenly items-center sm:gap-2 gap-5 py-6 ${
							currentStep === 4 && 'hidden'
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
							type={currentStep < 4 ? 'button' : 'submit'}
							onClick={nextStep}
							className="w-full sm:w-auto order-2 sm:order-3 border-2 border-bob-border-color text-primary-color bg-bob-color 
								font-semibold rounded-lg md:px-10 px-0 2xl:py-7 2xl:text-2xl"
						>
							{currentStep === 4 ? 'Submit' : 'Next'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
