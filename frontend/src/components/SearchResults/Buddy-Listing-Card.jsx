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

export function BuddyListingCard({ buddyList }) {
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
								userAvatar={buddyList.user.avatar}
								altAvatarName={buddyList.user.name}
							/>
							{/*** Profile Name & Verified Icon ***/}
							<VerifiedBuddyName userName={buddyList.user.name} />
						</div>
					</div>

					{/**** Type of Booking - Travel/Courier *****/}
					<ServiceCategoryTag serviceType={buddyList.user.type} />

					{/**** Language/Courier Preferences ****/}
					<LanguageCourierTag
						serviceType={buddyList.user.type}
						userPreference={buddyList.user.preferences}
					/>
				</div>

				{/* Vertical Line Separator */}
				<CardVerticalSeparator />
				{/* Horizontal Line Separator */}
				<CardHorizontalSeparator />

				<div className="flex flex-col lg:flex-row justify-evenly md:max-lg:items-baseline max-sm:items-center">
					{/******** Flight Details Section **********/}
					<div className="flex flex-1 flex-col lg:p-5 md:py-2.5 py-4 md:pr-10 md:px-0 px-4">
						<div className="flex flex-row md:items-center md:justify-between">
							{/***** Departure *****/}
							<div className="text-start">
								<BookingsSchedule
									time={buddyList.departure.time}
									date={buddyList.departure.date}
									location={buddyList.departure.location}
								/>
							</div>

							{/**** Flight Connection Type ****/}
							<FlightStopType
								connectionType={buddyList.connectionType}
								connectionLocation={buddyList.connectionLocation}
							/>

							{/***** Arrival *****/}
							<div className="text-end">
								<BookingsSchedule
									time={buddyList.arrival.time}
									date={buddyList.arrival.date}
									location={buddyList.arrival.location}
								/>
							</div>
						</div>
					</div>

					{/***** Vertical Line Separator *****/}
					<CardVerticalSeparator />

					{/****** Actions or Status *******/}
					<SendRequestButton price={buddyList.price} />
				</div>
			</div>
		</Card>
	);
}
