import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LineSeparator from '@/assets/Common/Line-Separator.svg';
import BookingsActionButtons from './Bookings-Action-Buttons';
import BookingStatusDetails from './BookingStatusDetails';
import BuddyCardAvatar from '../ReUsable/Service-Seeker/Buddy-Card-Avatar';
import { getPreferencesList } from '@/utils/listingPreferencesHelper';
import VerifiedBuddyName from '../ReUsable/Service-Seeker/Verified-Buddy-Name';
import ServiceCategoryTag from '../ReUsable/Service-Seeker/Service-Category-Tag';
import LanguageCourierTag from '../ReUsable/Service-Seeker/Language-Courier-Tag';
import FlightStopType from '../ReUsable/Service-Seeker/Flight-Stop-Type';
import TripSchedule from '../ServiceProvider/Dashboard-TabContent/TripSchedule';

export function BookingCard({ booking }) {
	const isActive = booking?.listingStatus === 'active';
	const isRejected = booking?.listingStatus === 'rejected';
	const isCancelled = booking?.listingStatus === 'cancelled';
	const isCompleted = booking?.listingStatus === 'completed';
	const isPending = booking?.listingStatus === 'pending';
	const isAccepted = booking?.listingStatus === 'accepted';

	/************** Retreive Travel/Courier Listing Type ************/
	const serviceType = booking?.serviceType;

	/****** List of Courier/Languages Preferences ******/
	const preferencesList = getPreferencesList(booking?.trip_details, serviceType);

	/****** Set User Name ******/
	const firstName = booking?.service_Provider_Details?.userDetails?.firstName;

	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl py-0">
			<div className="flex flex-col-reverse md:flex-row items-center md:max-lg:justify-between max-sm:gap-5">
				{/**** User Info Section *****/}
				<div className="pl-5 pb-5 md:w-1/3 w-full">
					{/* Profile Pic and Verified Tag */}
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-3 mt-4">
							{/*** Profile Pic ***/}
							<BuddyCardAvatar userName={firstName} />
							{/***** Profile Name & Verified Icon *****/}
							<VerifiedBuddyName
								userName={firstName}
								isVerified={booking?.service_Provider_Details?.isVerified}
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
				<img
					className="md:block hidden w-0.5"
					src={LineSeparator}
					alt="Line Separator"
				/>
				{/* Horizontal Line Separator */}
				<Separator
					className="md:hidden block w-0.5 bg-bob-line-separator-color data-[orientation=horizontal]:w-[90%]"
					orientation="horizontal"
				/>

				<div className="flex flex-col lg:flex-row justify-evenly md:max-lg:items-baseline max-sm:items-center">
					{/*** Flight Details Section ***/}
					<div className="flex flex-1 flex-col lg:p-5 md:py-2.5 py-4 md:pr-10 md:px-0 px-4">
						<div className="flex flex-row md:items-center md:justify-between">
							{/**** Departure ****/}
							<div className="text-start">
								<TripSchedule
									time={booking?.trip_details?.departureTime}
									date={booking?.trip_details?.departureDate}
									location={booking?.trip_details?.departureAirport}
								/>
							</div>

							{/**** Flight Connection Type ****/}
							<FlightStopType
								connectionType={booking?.trip_details?.stops}
								connectionLocation={booking?.trip_details?.stopAirports}
							/>

							{/***** Arrival *****/}
							<div className="text-end">
								<TripSchedule
									time={booking?.trip_details?.arrivalTime}
									date={booking?.trip_details?.arrivalDate}
									location={booking?.trip_details?.arrivalAirport}
								/>
							</div>
						</div>
					</div>

					{/* Vertical Line Separator */}
					<img
						className="lg:block hidden w-0.5"
						src={LineSeparator}
						alt="Line Separator"
					/>

					{/******** Actions or Status ********/}
					<div
						className={`flex flex-col gap-2 ${
							isActive
								? 'md:flex-col md:justify-center items-center max-w-2xs'
								: 'justify-center lg:max-w-2xs max-w-fit'
						}`}
					>
						{isActive ? (
							<BookingsActionButtons booking={booking} />
						) : (
							<BookingStatusDetails
								isRejected={isRejected}
								isCancelled={isCancelled}
								isCompleted={isCompleted}
								isPending={isPending}
								isAccepted={isAccepted}
								booking={booking}
								serviceType={serviceType}
							/>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
}
