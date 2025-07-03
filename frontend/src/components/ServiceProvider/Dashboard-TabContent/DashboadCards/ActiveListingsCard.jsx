import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TripSchedule from '../TripSchedule';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import BuddyRequestTypeTag from '../BuddyRequestTypeTag';
import { Separator } from '@/components/ui/separator';

export default function ActiveListingsCard({ activeListings, setActiveTab }) {
	return (
		<Card>
			<CardHeader className="px-5">
				<CardTitle className="font-semibold 2xl:text-2xl md:text-xl">
					Active Listings
				</CardTitle>
			</CardHeader>
			<CardContent className="px-5">
				{activeListings.length > 0 ? (
					<div className="space-y-12">
						{activeListings.slice(0, 2).map((listing) => {
							/****** List of Courier/Languages Preferences ******/
							const isTravelBuddy = listing?.serviceType === 'Travel Buddy';
							const selectionType = isTravelBuddy ? 'Speaks' : 'Prefers';

							const preferencesList = isTravelBuddy
								? [listing?.language1, listing?.language2, listing?.language3].filter(
										Boolean
								  )
								: Array.from(
										new Set(
											(listing?.courierPreferences || []).map((item) =>
												item.toLowerCase().startsWith('electronics') ? 'Electronics' : item
											)
										)
								  );

							return (
								<div key={listing.listing_id} className="space-y-4">
									{/******** Flight Details Section **********/}
									<div className="flex flex-row md:items-center md:justify-between">
										{/***** Departure *****/}
										<div className="text-start">
											<TripSchedule
												time={listing?.departureTime}
												date={listing?.departureDate}
												location={listing?.departureAirport}
											/>
										</div>

										{/**** Flight Connection Type ****/}
										<FlightStopType
											connectionType={listing?.connectionType}
											connectionLocation={listing?.connectionLocation}
										/>

										{/***** Arrival *****/}
										<div className="text-end">
											<TripSchedule
												time={listing?.arrivalTime}
												date={listing?.arrivalDate}
												location={listing?.arrivalAirport}
											/>
										</div>
									</div>

									{/**** Language/Courier Preferences ****/}
									<div className="flex justify-items-start items-center gap-3">
										<BuddyRequestTypeTag serviceType={listing?.serviceType} />

										<BuddyRequestTypeTag
											selectionType={selectionType}
											preferencesList={preferencesList}
										/>
									</div>
									<Button
										className="bg-bob-color border-2 border-bob-border-color w-full rounded-2xl font-semibold 2xl:text-xl py-5"
										onClick={() => setActiveTab('active-listings')}
									>
										View listing
									</Button>

									{/**** Line Separator ****/}
									<Separator
										orientation="Horizontal"
										className="data-[orientation=horizontal]:h-1"
									/>
								</div>
							);
						})}
						<div className="pt-5">
							<Button
								className="w-full font-bold 2xl:text-xl py-5 
                                text-bob-color bg-white cursor-pointer"
								onClick={() => setActiveTab('active-listings')}
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
