import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TripSchedule from '../TripSchedule';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import BuddyCardAvatar from '@/components/ReUsable/Service-Seeker/Buddy-Card-Avatar';
import VerifiedBuddyName from '@/components/ReUsable/Service-Seeker/Verified-Buddy-Name';
import { Separator } from '@/components/ui/separator';
import BuddyRequestTypeTag from '../BuddyRequestTypeTag';
import ViewRequestPopup from '../../BuddyRequests-TabContent.jsx/ViewRequestPopup';
import { useState } from 'react';

export default function BuddyRequestsCard({ buddyRequests, setActiveTab }) {
	const [open, setOpen] = useState(false);
	const [selectedViewRequest, setSelectedViewRequest] = useState([]);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Card>
				<CardHeader className="px-5">
					<CardTitle className="font-semibold 2xl:text-2xl md:text-xl">
						Buddy Requests
					</CardTitle>
				</CardHeader>
				<CardContent className="px-5 h-full flex flex-col justify-between">
					{buddyRequests.length > 0 ? (
						<div className="space-y-6 flex flex-col flex-grow">
							{buddyRequests?.slice(0, 2).map((request) => (
								<div key={request.id} className="space-y-4">
									{/******** Flight Details Section **********/}
									<div className="flex flex-row md:items-center md:justify-between">
										{/***** Departure *****/}
										<div className="text-start">
											<TripSchedule
												time={request?.trip_details?.departureTime}
												date={request?.trip_details?.departureDate}
												location={request?.trip_details?.departureAirport}
											/>
										</div>

										{/**** Flight Connection Type ****/}
										<FlightStopType
											connectionType={request?.trip_details?.stops}
											connectionLocation={request?.trip_details?.stopAirports}
										/>

										{/***** Arrival *****/}
										<div className="text-end">
											<TripSchedule
												time={request?.trip_details?.arrivalTime}
												date={request?.trip_details?.arrivalDate}
												location={request?.trip_details?.arrivalAirport}
											/>
										</div>
									</div>

									<div className="flex justify-between items-center gap-3">
										<div className="flex items-center gap-3 mt-4">
											{/*** Profile Pic ***/}
											<BuddyCardAvatar
												userName={request?.service_Seeker_Details?.firstName}
											/>
											{/*** Profile Name & Verified Icon ***/}
											<VerifiedBuddyName
												userName={request?.service_Seeker_Details?.firstName}
												isVerified={request?.service_Seeker_Details?.emailVerified}
											/>
										</div>

										{/**** Language/Courier Preferences ****/}
										<BuddyRequestTypeTag serviceType={request?.serviceType} />
									</div>

									<Button
										className="bg-bob-color border-2 border-bob-border-color w-full rounded-2xl font-semibold 2xl:text-xl py-5"
										onClick={() => {
											setOpen((prev) => !prev);
											setSelectedViewRequest(request);
										}}
									>
										View request
									</Button>

									{/**** Line Separator ****/}
									<Separator
										orientation="Horizontal"
										className="data-[orientation=horizontal]:h-1"
									/>
								</div>
							))}
							<div className="pt-5 mt-auto">
								<Button
									className="w-full font-bold 2xl:text-xl py-5 text-bob-color bg-white cursor-pointer"
									onClick={() => setActiveTab('buddy-requests')}
								>
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

			{/**** View Request Popup ****/}
			<ViewRequestPopup
				open={open}
				setOpen={setOpen}
				onClose={handleClose}
				buddyRequestsList={selectedViewRequest}
			/>
		</>
	);
}
