import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TripSchedule from '../TripSchedule';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import BuddyCardAvatar from '@/components/ReUsable/Service-Seeker/Buddy-Card-Avatar';
import VerifiedBuddyName from '@/components/ReUsable/Service-Seeker/Verified-Buddy-Name';
import { Separator } from '@/components/ui/separator';
import BuddyRequestTypeTag from '../BuddyRequestTypeTag';

export default function BuddyRequestsCard({ hasData, buddyRequests }) {
	return (
		<Card>
			<CardHeader className="px-5">
				<CardTitle className="font-semibold 2xl:text-2xl md:text-xl">
					Buddy Requests
				</CardTitle>
			</CardHeader>
			<CardContent className="px-5">
				{hasData ? (
					<div className="space-y-6">
						{buddyRequests.map((request) => (
							<div key={request.id} className="space-y-4">
								{/******** Flight Details Section **********/}
								<div className="flex flex-row md:items-center md:justify-between">
									{/***** Departure *****/}
									<div className="text-start">
										<TripSchedule
											time={request.departure.time}
											date={request.departure.date}
											location={request.departure.location}
										/>
									</div>

									{/**** Flight Connection Type ****/}
									<FlightStopType
										connectionType={request.connectionType}
										connectionLocation={request.connectionLocation}
									/>

									{/***** Arrival *****/}
									<div className="text-end">
										<TripSchedule
											time={request.arrival.time}
											date={request.arrival.date}
											location={request.arrival.location}
										/>
									</div>
								</div>

								<div className="flex justify-between items-center gap-3">
									<div className="flex items-center gap-3 mt-4">
										{/*** Profile Pic ***/}
										<BuddyCardAvatar
											userAvatar={request.user?.avatar}
											altAvatarName={request.user?.name}
										/>
										{/*** Profile Name & Verified Icon ***/}
										<VerifiedBuddyName
											userName={request.user?.name}
											userId={request.id}
										/>
									</div>

									{/**** Language/Courier Preferences ****/}
									<BuddyRequestTypeTag serviceType={request.type} />
								</div>

								<Button className="bg-bob-color border-2 border-bob-border-color w-full rounded-2xl font-semibold 2xl:text-xl py-5">
									View request
								</Button>

								{/**** Line Separator ****/}
								<Separator
									orientation="Horizontal"
									className="data-[orientation=horizontal]:h-1"
								/>
							</div>
						))}
						<div className="pt-5">
							<Button className="w-full font-bold 2xl:text-xl py-5 text-bob-color bg-white cursor-pointer">
								View all
							</Button>
						</div>
					</div>
				) : (
					<div className="py-8 text-center 2xl:text-xl text-bob-filters-placeholder-color">
						You have no buddy requests.
					</div>
				)}
			</CardContent>
		</Card>
	);
}
