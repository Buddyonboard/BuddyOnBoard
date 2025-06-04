import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import { Separator } from '@/components/ui/separator';
import BuddyCardAvatar from '@/components/ReUsable/Service-Seeker/Buddy-Card-Avatar';
import VerifiedBuddyName from '@/components/ReUsable/Service-Seeker/Verified-Buddy-Name';
import TripSchedule from '../TripSchedule';

export default function UpcomingTripsCard({ hasData, upcomingTrip }) {
	return (
		<Card className="lg:pb-40">
			<CardHeader className="px-5">
				<CardTitle className="font-semibold 2xl:text-2xl md:text-xl">
					Your upcoming trip
				</CardTitle>
			</CardHeader>
			<CardContent className="px-5">
				{hasData ? (
					<div className="space-y-4">
						{/******** Flight Details Section **********/}
						<div className="flex flex-row md:items-center md:justify-between">
							{/***** Departure *****/}
							<div className="text-start">
								<TripSchedule
									time={upcomingTrip.departure.time}
									date={upcomingTrip.departure.date}
									location={upcomingTrip.departure.location}
								/>
							</div>

							{/**** Flight Connection Type ****/}
							<FlightStopType
								connectionType={upcomingTrip.connectionType}
								connectionLocation={upcomingTrip.connectionLocation}
							/>

							{/***** Arrival *****/}
							<div className="text-end">
								<TripSchedule
									time={upcomingTrip.arrival.time}
									date={upcomingTrip.arrival.date}
									location={upcomingTrip.arrival.location}
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
							{upcomingTrip.contact.type === 'Travel Buddy'
								? 'You’re travel buddy point of contact is'
								: 'Collect courier item from'}
						</div>
						{/***** Profile Pic and Verified Tag *****/}
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-3 mt-4">
								{/*** Profile Pic ***/}
								<BuddyCardAvatar
									userAvatar={upcomingTrip.user?.avatar}
									altAvatarName={upcomingTrip.user?.name}
								/>
								{/*** Profile Name & Verified Icon ***/}
								<VerifiedBuddyName
									userName={upcomingTrip.contact.name}
									userId={upcomingTrip.id}
								/>
							</div>
						</div>
						<Button className="bg-bob-color border-2 border-bob-border-color w-full rounded-2xl font-semibold 2xl:text-xl py-5">
							Message buddy
						</Button>
					</div>
				) : (
					<div className="py-8 text-center 2xl:text-xl text-bob-filters-placeholder-color">
						You have no upcoming trips.
					</div>
				)}
			</CardContent>
		</Card>
	);
}
