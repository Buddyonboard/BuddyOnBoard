import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import { Separator } from '@/components/ui/separator';
import BuddyCardAvatar from '@/components/ReUsable/Service-Seeker/Buddy-Card-Avatar';
import VerifiedBuddyName from '@/components/ReUsable/Service-Seeker/Verified-Buddy-Name';
import TripSchedule from '../TripSchedule';

export default function UpcomingTripsCard({ upcomingTrip }) {
	const hasData = upcomingTrip.length > 0;

	return (
		<Card className="lg:pb-40">
			<CardHeader className="px-5">
				<CardTitle className="font-semibold 2xl:text-2xl md:text-xl">
					Your upcoming trip
				</CardTitle>
			</CardHeader>
			<CardContent className="px-5">
				{hasData ? (
					upcomingTrip.map((trip) => (
						<div className="space-y-4">
							{/******** Flight Details Section **********/}
							<div className="flex flex-row md:items-center md:justify-between">
								{/***** Departure *****/}
								<div className="text-start">
									<TripSchedule
										time={trip?.trip_details?.departureTime}
										date={trip?.trip_details?.departureDate}
										location={trip?.trip_details?.departureAirport}
									/>
								</div>

								{/**** Flight Connection Type ****/}
								<FlightStopType
									connectionType={trip?.trip_details?.stops}
									connectionLocation={trip?.trip_details?.stopAirports}
								/>

								{/***** Arrival *****/}
								<div className="text-end">
									<TripSchedule
										time={trip?.trip_details?.arrivalTime}
										date={trip?.trip_details?.arrivalDate}
										location={trip?.trip_details?.arrivalAirport}
									/>
								</div>
							</div>

							{/**** Line Separator ****/}
							<Separator
								orientation="Horizontal"
								className="data-[orientation=horizontal]:h-1"
							/>

							<div
								className="text-sm 2xl:text-xl text-bob-outline-color 
							font-medium"
							>
								{trip?.serviceType == 'Travel Buddy'
									? 'You’re travel buddy point of contact is'
									: 'Collect courier item from'}
							</div>
							{/***** Profile Pic and Verified Tag *****/}
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-3 mt-4">
									{/*** Profile Pic ***/}
									<BuddyCardAvatar userName={trip?.service_Seeker_Details?.firstName} />
									{/*** Profile Name & Verified Icon ***/}
									<VerifiedBuddyName
										userName={trip?.service_Seeker_Details?.firstName}
										isVerified={trip?.service_Seeker_Details?.emailVerified}
									/>
								</div>
							</div>
							<Button className="bg-bob-color border-2 border-bob-border-color w-full rounded-2xl font-semibold 2xl:text-xl py-5">
								Message buddy
							</Button>
						</div>
					))
				) : (
					<div className="py-8 text-center 2xl:text-xl text-bob-filters-placeholder-color">
						You have no upcoming trips.
					</div>
				)}
			</CardContent>
		</Card>
	);
}
