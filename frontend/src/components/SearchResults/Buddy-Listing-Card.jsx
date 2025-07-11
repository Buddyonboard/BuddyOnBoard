import { Card } from '@/components/ui/card';
import BuddyCardAvatar from '@/components/ReUsable/Service-Seeker/Buddy-Card-Avatar';
import VerifiedBuddyName from '../ReUsable/Service-Seeker/Verified-Buddy-Name';
import BookingsSchedule from '../Bookings/Bookings-Schedule';
import ServiceCategoryTag from '../ReUsable/Service-Seeker/Service-Category-Tag';
import LanguageCourierTag from '../ReUsable/Service-Seeker/Language-Courier-Tag';
import CardVerticalSeparator from '../ReUsable/Card-Vertical-Separator';
import CardHorizontalSeparator from '../ReUsable/Card-Horizontal-Separator';
import FlightStopType from '../ReUsable/Service-Seeker/Flight-Stop-Type';
import SendRequestButton from './Send-Request-Button';
import {
	getListingByServiceType,
	getPreferencesList,
	getStartingPrice
} from '@/utils/listingPreferencesHelper';

export function BuddyListingCard({ buddyList, serviceType }) {
	const travelListing = buddyList?.buddy_Listing_Details?.travel_listing;

	/************** Retreive Travel/Courier Listing Type ************/
	const listingType = getListingByServiceType(buddyList, serviceType);

	/****** List of Courier/Languages Preferences ******/
	const preferencesList = getPreferencesList(listingType, serviceType);

	/****** Collect lowest starting price fields dynamically ******/
	const priceStarts = getStartingPrice(listingType, serviceType);

	/****** Set User Name ******/
	const firstName = buddyList?.serviceProviderDetails?.userDetails?.firstName;

	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl py-0">
			<div className="flex flex-col-reverse md:flex-row items-center md:max-lg:justify-between max-sm:gap-5">
				{/************ User Info Section *************/}
				<div className="pl-5 pb-5 md:w-1/3 w-full">
					{/***** Profile Pic and Verified Tag *****/}
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-3 mt-4">
							{/*** Profile Pic ***/}
							<BuddyCardAvatar
								// userAvatar={buddyList?.user?.avatar}
								// altAvatarName={buddyList?.user?.name}
								userName={firstName}
							/>
							{/*** Profile Name & Verified Icon ***/}
							<VerifiedBuddyName
								userName={firstName}
								userId={listingType?.listing_id}
								isVerified={buddyList?.serviceProviderDetails?.isVerified}
								page="search"
							/>
						</div>
					</div>

					{/**** Type of Booking - Travel/Courier *****/}
					<ServiceCategoryTag serviceType={serviceType} />

					{/**** Language/Courier Preferences ****/}
					<LanguageCourierTag
						serviceType={serviceType}
						preferencesList={preferencesList}
					/>
				</div>

				{/* Vertical Line Separator */}
				<CardVerticalSeparator />
				{/* Horizontal Line Separator */}
				<CardHorizontalSeparator />

				<div className="flex flex-col lg:flex-row justify-evenly md:max-lg:items-center max-sm:items-center">
					{/******** Flight Details Section **********/}
					<div className="flex flex-1 flex-col lg:p-5 md:py-2.5 py-4 md:pr-10 md:px-0 px-4 md:max-lg:mt-3">
						<div className="flex flex-row md:items-center md:justify-between">
							{/***** Departure *****/}
							<div className="text-start">
								<BookingsSchedule
									time={listingType?.departureTime}
									date={listingType?.departureDate}
									location={listingType?.departureAirport}
								/>
							</div>

							{/**** Flight Connection Type ****/}
							<FlightStopType
								connectionType={travelListing?.stops}
								connectionLocation={travelListing?.stopAirports}
							/>

							{/***** Arrival *****/}
							<div className="text-end">
								<BookingsSchedule
									time={listingType?.arrivalTime}
									date={listingType?.arrivalDate}
									location={listingType?.arrivalAirport}
								/>
							</div>
						</div>
					</div>

					{/***** Vertical Line Separator *****/}
					<div className="lg:block hidden">
						<CardVerticalSeparator />
					</div>

					{/****** Actions or Status *******/}
					<SendRequestButton price={priceStarts} buddyDetails={buddyList} />
				</div>
			</div>
		</Card>
	);
}
