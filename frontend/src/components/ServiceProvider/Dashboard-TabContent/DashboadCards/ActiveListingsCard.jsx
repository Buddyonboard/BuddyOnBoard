import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TripSchedule from '../TripSchedule';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import BuddyRequestTypeTag from '../BuddyRequestTypeTag';
import { Separator } from '@/components/ui/separator';

export default function ActiveListingsCard({ hasData, activeListings }) {
	return (
		<Card>
			<CardHeader className="px-5">
				<CardTitle className="font-semibold 2xl:text-2xl md:text-xl">
					Active Listings
				</CardTitle>
			</CardHeader>
			<CardContent className="px-5">
				{hasData ? (
					<div className="space-y-12">
						{activeListings.map((listing) => (
							<div key={listing.id} className="space-y-4">
								{/******** Flight Details Section **********/}
								<div className="flex flex-row md:items-center md:justify-between">
									{/***** Departure *****/}
									<div className="text-start">
										<TripSchedule
											time={listing.departure.time}
											date={listing.departure.date}
											location={listing.departure.location}
										/>
									</div>

									{/**** Flight Connection Type ****/}
									<FlightStopType
										connectionType={listing.connectionType}
										connectionLocation={listing.connectionLocation}
									/>

									{/***** Arrival *****/}
									<div className="text-end">
										<TripSchedule
											time={listing.arrival.time}
											date={listing.arrival.date}
											location={listing.arrival.location}
										/>
									</div>
								</div>

								{/**** Language/Courier Preferences ****/}
								<div className="flex justify-items-start items-center gap-3">
									<BuddyRequestTypeTag serviceType={listing.type} />
									<BuddyRequestTypeTag productType={listing.tag} />
								</div>
								<Button className="bg-bob-color border-2 border-bob-border-color w-full rounded-2xl font-semibold 2xl:text-xl py-5">
									View listing
								</Button>

								{/**** Line Separator ****/}
								<Separator
									orientation="Horizontal"
									className="data-[orientation=horizontal]:h-1"
								/>
							</div>
						))}
						<div className="pt-5">
							<Button
								className="w-full font-bold 2xl:text-xl py-5 
                                text-bob-color bg-white cursor-pointer"
							>
								View all
							</Button>
						</div>
					</div>
				) : (
					<div className="py-8 text-center 2xl:text-xl text-bob-filters-placeholder-color">
						You have no active listings.
					</div>
				)}
			</CardContent>
		</Card>
	);
}
