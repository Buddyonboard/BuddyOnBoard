import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import CONST from '@/utils/Constants';
import { useSearchParams } from 'react-router-dom';
import API_URL from '../../../environments/Environment-dev';
import { showWarningToast } from '@/utils/toastUtils';
import axios from 'axios';
import LanguageCourierTag from '../ReUsable/Service-Seeker/Language-Courier-Tag';
import ServiceCategoryTag from '../ReUsable/Service-Seeker/Service-Category-Tag';
import VerifiedBuddyName from '../ReUsable/Service-Seeker/Verified-Buddy-Name';
import BuddyCardAvatar from '../ReUsable/Service-Seeker/Buddy-Card-Avatar';
import TripSchedule from '../ServiceProvider/Dashboard-TabContent/TripSchedule';
import FlightStopType from '../ReUsable/Service-Seeker/Flight-Stop-Type';
import { getPreferencesList } from '@/utils/listingPreferencesHelper';
import GenderIcon from '@/assets/SearchListing/GenderIcon.svg';
import HandShake from '@/assets/SearchListing/HandShake.svg';
import HumanIcon from '@/assets/SearchListing/HumanIcon.svg';

export default function BookingSummaryPage() {
	const [searchParams] = useSearchParams();
	const bookingId = searchParams.get('bookingId');
	const status = searchParams.get('status');
	const [bookingData, setBookingData] = useState(null);
	const [loading, setLoading] = useState(true);

	/************* Fetching and Filtering Buddy Req based on bookingId **************/
	useEffect(() => {
		const fetchBookingData = async () => {
			try {
				const res = await axios.get(`${API_URL}/get-buddy-requests`);

				const resData = res?.data?.data;

				const bookings = resData?.filter((item) => item._id === `${bookingId}`);

				setBookingData(bookings[0]);
			} catch (error) {
				showWarningToast();
				// console.error('Failed to fetch booking data:', error);
			} finally {
				setLoading(false);
			}
		};

		if (bookingId && status == 'success') {
			fetchBookingData();
		}
	}, [bookingId, status]);

	if (!bookingData) return <div>Booking not found</div>;
	if (loading) return <div>Loading booking details...</div>;

	/************** Retreive Travel/Courier Listing Type ************/
	const serviceType = bookingData?.serviceType;

	/****** List of Courier/Languages Preferences ******/
	const preferencesList = getPreferencesList(
		bookingData?.trip_details,
		serviceType
	);

	const firstName =
		bookingData?.service_Provider_Details?.userDetails?.firstName;

	const isCourierBuddy = serviceType === 'Courier Buddy';
	const isTravelBuddy = serviceType === 'Travel Buddy';
	const detailsType = isTravelBuddy ? 'passengers_List' : 'courier_Items_List';
	const listType = isTravelBuddy ? 'Passenger' : 'Courier Item';

	return (
		<div className="min-h-screen p-4 md:p-8 lg:p-12">
			<div className="mx-auto">
				<h1 className="2xl:text-5xl text-3xl font-normal mb-6 font-merriweather">
					Your booking is successful!
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/************* Left Card - Flight and Traveler Info **************/}
					<Card className="lg:col-span-1 lg:h-fit">
						<CardContent className="p-2">
							{/*********** Flight Details Section **************/}
							<div className="flex flex-1 flex-col md:py-2.5 py-4 md:px-0 px-4">
								<div className="flex flex-row md:items-center md:justify-between">
									{/**** Departure ****/}
									<div className="text-start">
										<TripSchedule
											time={bookingData?.trip_details?.departureTime}
											date={bookingData?.trip_details?.departureDate}
											location={bookingData?.trip_details?.departureAirport}
										/>
									</div>

									{/**** Flight Connection Type ****/}
									<FlightStopType
										connectionType={bookingData?.trip_details?.stops}
										connectionLocation={bookingData?.trip_details?.stopAirports}
									/>

									{/***** Arrival *****/}
									<div className="text-end">
										<TripSchedule
											time={bookingData?.trip_details?.arrivalTime}
											date={bookingData?.trip_details?.arrivalDate}
											location={bookingData?.trip_details?.arrivalAirport}
										/>
									</div>
								</div>
							</div>

							{/********* Traveler Profile ************/}
							<div className="pb-5 w-full">
								{/****** Profile Pic and Verified Tag *****/}
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-3 mt-4">
										{/*** Profile Pic ***/}
										<BuddyCardAvatar userName={firstName} />
										{/***** Profile Name & Verified Icon *****/}
										<VerifiedBuddyName
											userName={firstName}
											isVerified={bookingData?.service_Provider_Details?.isVerified}
										/>
									</div>
								</div>

								<div className="flex flex-row gap-2">
									{/**** Type of Booking - Travel/Courier *****/}
									<ServiceCategoryTag serviceType={serviceType} />

									{/**** Language/Courier Preferences ****/}
									<LanguageCourierTag
										serviceType={serviceType}
										preferencesList={preferencesList}
									/>
								</div>
							</div>

							{/***** Send Message Button *****/}
							{/* <Button
								className="bg-bob-color border-2 border-bob-border-color
                				cursor-pointer rounded-2xl lg:py-5 w-full 2xl:text-xl"
							>
								Send message
							</Button> */}

							{/****************** Preferences Section *****************/}
							{serviceType === 'Travel Buddy' && (
								<div>
									<h3 className="mb-4 2xl:text-2xl text-base font-bold">Preferences</h3>
									<div className="space-y-3">
										{/*** Can Help With ***/}
										<div className="flex items-center gap-3">
											<img src={HandShake} alt="HandShake" />
											<span className="text-bob-form-label-color font-normal 2xl:text-2xl">
												Can help with{' '}
												{bookingData?.trip_details?.travelAssitanceOptions?.join(', ')}
											</span>
										</div>

										{/*** Languages ***/}
										<div className="flex items-center gap-3">
											<img src={HumanIcon} alt="HumanIcon" />
											<span className="text-bob-form-label-color font-normal 2xl:text-2xl">
												Speaks {preferencesList?.join(', ')}
											</span>
										</div>

										{/*** Gender Preference ***/}
										<div className="flex items-center gap-3">
											<img src={GenderIcon} alt="GenderIcon" />
											<span className="text-bob-form-label-color font-normal 2xl:text-2xl">
												Comfortable accompanying{' '}
												{bookingData?.trip_details?.companionPreference !== 'no-preference'
													? `only ${bookingData?.trip_details?.companionPreference} travelers`
													: 'anyone'}
											</span>
										</div>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/*********** Right Card - Booking and Payment Details *************/}
					<Card className="lg:col-span-2">
						<CardContent>
							{/************ Booking Details *************/}
							<h2 className="2xl:text-3xl text-xl font-semibold mb-4">
								Booking Details
							</h2>

							{/************ Passengers / Items List *************/}
							<div className="mb-4">
								<div className="text-sm text-gray-500">
									{isTravelBuddy ? 'Total Passengers' : 'Total Items'}
								</div>
								<div className="font-medium">
									{isTravelBuddy ? bookingData?.passengerCount : bookingData?.totalItems}
								</div>
							</div>

							{bookingData?.[detailsType]?.map((item, index) => (
								<div key={index} className="mb-6">
									<div className="2xl:text-lg md:text-base text-sm font-semibold text-bob-search-input-label-color mb-3">
										{listType} {index + 1}
									</div>
									{/********** Order Details **********/}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{/**** AGE / Item Name ****/}
										<div>
											<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
												{isTravelBuddy ? 'AGE' : 'ITEM'}
											</div>
											<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
												{isTravelBuddy ? item.age : item.itemType}
											</div>
										</div>
										{/**** Gender / Approx Weight ****/}
										<div>
											<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
												{isTravelBuddy ? 'Gender' : 'APPROXIMATE WEIGHT IN GRAMS'}
											</div>
											<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
												{isTravelBuddy ? item.gender : item.itemWeight}
											</div>
										</div>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
										{/**** Item Description ****/}
										<div>
											<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
												{isCourierBuddy && 'DESCRIPTION'}
											</div>
											<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
												{isCourierBuddy && item.itemDescription}
											</div>
										</div>
									</div>
								</div>
							))}

							<Separator className="my-6" />

							{/************** Payment Details ************/}
							<h2 className="2xl:text-3xl text-xl font-semibold mb-4">
								Payment Details
							</h2>

							<div className="space-y-4">
								{/********** Booking ID ***********/}
								<div>
									<div className="2xl:text-xl text-base text-bob-search-input-label-color font-semibold">
										BOOKING ID
									</div>
									<div className="2xl:text-xl text-base text-bob-buddy-listing-accordion-color font-semibold">
										#{bookingId}
									</div>
								</div>

								{/********** Buddy Service Fee ***********/}
								<div>
									<div className="2xl:text-xl text-base text-bob-search-input-label-color font-semibold">
										BUDDY SERVICE FEE
									</div>
									<div className="2xl:text-xl text-base text-bob-buddy-listing-accordion-color font-semibold">
										${bookingData?.totalAmount?.buddyServiceFee}
									</div>
								</div>

								{/********** Platform Fee ************/}
								<div>
									<div className="flex items-center gap-1">
										<span className="2xl:text-xl text-base text-bob-search-input-label-color font-semibold">
											PLATFORM FEES
										</span>
										{/***** Platform Fees Tooltip *****/}
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<Info
														className="size-3.5 2xl:size-5
													text-bob-pricing-block-color"
													/>
												</TooltipTrigger>
												<TooltipContent>
													<p className="max-w-xs 2xl:text-lg text-sm">
														{CONST.sendRequestForm.toolTipText}
													</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<div className="2xl:text-xl text-base text-bob-buddy-listing-accordion-color font-semibold">
										${bookingData?.totalAmount?.platformFee}
									</div>
								</div>

								{/********** Total Price Including Taxes ************/}
								<div>
									<div className="2xl:text-xl text-base text-bob-search-input-label-color font-semibold">
										TOTAL PRICE INCLUDING TAXES
									</div>
									<div className="2xl:text-xl text-base text-bob-buddy-listing-accordion-color font-semibold">
										${bookingData?.totalAmount?.totalPrice}
									</div>
								</div>
							</div>

							{/* <div className="flex justify-end mt-6">
								<Button
									variant="outline"
									className="text-blue-600 border-blue-600 hover:bg-blue-50"
									onClick={() => setShowReceipt(!showReceipt)}
								>
									Get receipt
								</Button>
							</div> */}

							{/* {showReceipt && (
								<div className="mt-6 p-4 border rounded-md bg-gray-50">
									<h3 className="font-semibold mb-2">Receipt</h3>
									<p className="text-sm text-gray-600">
										Your receipt has been sent to your email address.
									</p>
								</div>
							)} */}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
