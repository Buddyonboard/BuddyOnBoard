import { Card } from '@/components/ui/card';
import BuddyCardAvatar from '@/components/ReUsable/Service-Seeker/Buddy-Card-Avatar';
import VerifiedBuddyName from '@/components/ReUsable/Service-Seeker/Verified-Buddy-Name';
import ServiceCategoryTag from '@/components/ReUsable/Service-Seeker/Service-Category-Tag';
import LanguageCourierTag from '@/components/ReUsable/Service-Seeker/Language-Courier-Tag';
import CardVerticalSeparator from '@/components/ReUsable/Card-Vertical-Separator';
import CardHorizontalSeparator from '@/components/ReUsable/Card-Horizontal-Separator';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import BookingsSchedule from '@/components/Bookings/Bookings-Schedule';
import {
	getListingByServiceType,
	getPreferencesList
} from '@/utils/listingPreferencesHelper';

export default function BuddyInfoCard({ buddyDetails, serviceType }) {
	const travelListing = buddyDetails?.buddy_Listing_Details?.travel_listing;

	/************** Retreive Travel/Courier Listing Type ************/
	const listingType = getListingByServiceType(buddyDetails, serviceType);

	/****** List of Courier/Languages Preferences ******/
	const preferencesList = getPreferencesList(listingType, serviceType);

	/****** Set User Name ******/
	const firstName = buddyDetails?.serviceProviderDetails?.userDetails?.firstName;

	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl py-0 mb-6">
			<div className="flex flex-col-reverse md:flex-row items-center md:max-lg:justify-between max-sm:gap-0 lg:justify-around">
				{/************ User Info Section *************/}
				<div className="2xl:pl-0 pl-5 pb-5 md:w-1/3 w-full">
					{/***** Profile Pic and Verified Tag *****/}
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-3 mt-4">
							{/*** Profile Pic ***/}
							<BuddyCardAvatar userName={firstName} />
							{/*** Profile Name & Verified Icon ***/}
							<VerifiedBuddyName
								userName={firstName}
								isVerified={buddyDetails?.serviceProviderDetails?.isVerified}
							/>
						</div>
					</div>

					<div className="flex md:flex-row flex-col md:gap-2 gap-0">
						{/**** Number Of Trips Completed *****/}
						<ServiceCategoryTag
							serviceType="O trips completed"
							className="w-max font-medium"
						/>

						{/**** Language/Courier Preferences ****/}
						<LanguageCourierTag
							serviceType={serviceType}
							preferencesList={preferencesList}
						/>
					</div>
				</div>

				{/* Vertical Line Separator */}
				<CardVerticalSeparator page="listingInfo" />
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
				</div>
			</div>
		</Card>
	);
}
