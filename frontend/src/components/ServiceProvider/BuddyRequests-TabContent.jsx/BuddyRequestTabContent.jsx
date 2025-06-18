import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LineSeparator from '@/assets/Common/Line-Separator.svg';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import TripSchedule from '../Dashboard-TabContent/TripSchedule';
import BuddyCardAvatar from '@/components/ReUsable/Service-Seeker/Buddy-Card-Avatar';
import VerifiedBuddyName from '@/components/ReUsable/Service-Seeker/Verified-Buddy-Name';
import RequestActionsButton from './RequestActionsButton';

export default function BuddyRequestTabContent({ buddyRequestsList }) {
	const passengersCount = buddyRequestsList?.totalPassenger;
	const courierType = buddyRequestsList?.totalItems;
	const RequestDetails = passengersCount
		? `${passengersCount} Passengers`
		: `${courierType} Items`;

	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl py-0">
			<div className="flex flex-col-reverse md:flex-row items-center md:max-lg:justify-between max-sm:gap-5">
				{/************ User Info Section *************/}
				<div className="2xl:pl-10 pl-5 pb-5 md:w-1/3 w-full">
					{/**** Number of passengers/Type Of Items ****/}
					<div className="2xl:mt-6 sm:mt-4">
						<h1 className="font-semibold 2xl:text-3xl md:text-xl">
							{RequestDetails}
						</h1>
					</div>

					{/**** Type of Booking - Travel/Courier ****/}
					<div
						className="mt-3 flex items-center gap-1 rounded-full bg-bob-color
						xl:px-4 px-3 py-1 2xl:text-xl text-xs text-primary-color w-fit"
					>
						<span>{buddyRequestsList?.serviceType}</span>
					</div>

					{/***** Profile Pic and Verified Tag *****/}
					<div className="flex items-center gap-3 mt-4">
						<div className="xl:mr-2">
							<p className="text-bob-travel-details-color font-medium 2xl:text-2xl">
								Sent by
							</p>
						</div>
						{/*** Profile Pic ***/}
						<BuddyCardAvatar
							userAvatar={buddyRequestsList.serviceProviderDetails?.avatar}
							altAvatarName={buddyRequestsList.serviceProviderDetails?.name}
						/>
						{/*** Profile Name & Verified Icon ***/}
						<VerifiedBuddyName
							userName={buddyRequestsList.serviceProviderDetails?.name}
							userId={buddyRequestsList?.id}
						/>
					</div>
				</div>

				{/**** Vertical Line Separator ****/}
				<img
					className="md:block hidden w-0.5 2xl:mr-8"
					src={LineSeparator}
					alt="Line Separator"
				/>
				{/**** Horizontal Line Separator ****/}
				<Separator
					className="md:hidden block w-0.5 bg-bob-line-separator-color data-[orientation=horizontal]:w-[90%]"
					orientation="horizontal"
				/>

				<div className="flex flex-col lg:flex-row justify-evenly md:max-lg:items-baseline max-sm:items-center 2xl:gap-8">
					{/******** Flight Details Section ********/}
					<div className="flex flex-1 flex-col lg:p-5 md:py-2.5 py-4 md:pr-10 md:px-0 px-4">
						<div className="flex flex-row md:items-center md:justify-between">
							{/**** Departure ****/}
							<div className="text-start">
								<TripSchedule
									time={buddyRequestsList.departure?.time}
									date={buddyRequestsList.departure?.date}
									location={buddyRequestsList.departure?.location}
								/>
							</div>

							{/**** Flight Connection Type ****/}
							<FlightStopType
								connectionType={buddyRequestsList?.connectionType}
								connectionLocation={buddyRequestsList?.connectionLocation}
							/>

							{/**** Arrival ****/}
							<div className="text-end">
								<TripSchedule
									time={buddyRequestsList.arrival?.time}
									date={buddyRequestsList.arrival?.date}
									location={buddyRequestsList.arrival?.location}
								/>
							</div>
						</div>
					</div>

					{/**** Vertical Line Separator ****/}
					<img
						className="lg:block hidden w-0.5"
						src={LineSeparator}
						alt="Line Separator"
					/>

					{/********* Actions Buttons **********/}
					<div className="flex flex-col gap-2 justify-center lg:max-w-2xs">
						<RequestActionsButton buddyRequestsList={buddyRequestsList} />
					</div>
				</div>
			</div>
		</Card>
	);
}
