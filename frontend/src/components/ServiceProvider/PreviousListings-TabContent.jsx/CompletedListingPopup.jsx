import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import CONST from '@/utils/Constants';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import BuddyCardAvatar from '@/components/ReUsable/Service-Seeker/Buddy-Card-Avatar';
import VerifiedBuddyName from '@/components/ReUsable/Service-Seeker/Verified-Buddy-Name';
import TripSchedule from '../Dashboard-TabContent/TripSchedule';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';

export default function CompletedListingPopup({
	open,
	onClose,
	previousListingsList
}) {
	const platFormFee = 10.0;

	const serviceType = previousListingsList?.serviceType;
	const departure = previousListingsList.departure?.location;
	const arrival = previousListingsList.arrival?.location;

	const isCourierBuddy = serviceType === 'Courier Buddy';
	const isTravelBuddy = serviceType === 'Travel Buddy';
	const listType = isTravelBuddy ? 'Passenger' : 'Courier Item';

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className="sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl p-0 gap-0
            max-h-[calc(100vh-12rem)] overflow-y-scroll"
			>
				<div>
					{/***** Request Title *****/}
					<div className="p-6 space-y-6 mt-5">
						<DialogHeader className="border-b">
							<div className="flex items-center justify-between">
								<DialogTitle className="text-base 2xl:text-2xl sm:text-xl font-medium text-secondary-color">
									{`${serviceType} from ${departure} to ${arrival}`}
								</DialogTitle>
							</div>
						</DialogHeader>
					</div>

					{/***************** Passenger / Courier Details *******************/}
					<div className="px-4 sm:px-6 py-4 overflow-y-auto">
						{/************ Service Seeker Information ***********/}
						<div className="mb-8 flex flex-col-reverse">
							{/***** Profile Pic and Verified Tag *****/}
							<div className="flex sm:flex-row flex-col items-center gap-3 mt-5">
								<p className="text-bob-accordion-content-color font-semibold">
									Request sent by:
								</p>

								<div className="flex flex-row items-center gap-3">
									{/*** Profile Pic ***/}
									<BuddyCardAvatar
										userAvatar={previousListingsList.requestDetails?.avatar}
										altAvatarName={previousListingsList.requestDetails?.requestedBy}
									/>
									{/*** Profile Name & Verified Icon ***/}
									<VerifiedBuddyName
										userName={previousListingsList.serviceSeekerDetails?.name}
										userId={previousListingsList.id}
									/>
								</div>
							</div>

							{/************* Trip Details Section **************/}
							<div className="flex flex-1 flex-col md:px-0">
								<div className="flex flex-row md:items-center md:justify-between">
									{/**** Departure ****/}
									<div className="text-start">
										<TripSchedule
											time={previousListingsList.departure?.time}
											date={previousListingsList.departure?.date}
											location={previousListingsList.departure?.location}
										/>
									</div>

									{/**** Flight Connection Type ****/}
									<FlightStopType
										connectionType={previousListingsList?.connectionType}
										connectionLocation={previousListingsList?.connectionLocation}
									/>

									{/**** Arrival ****/}
									<div className="text-end">
										<TripSchedule
											time={previousListingsList.arrival?.time}
											date={previousListingsList.arrival?.date}
											location={previousListingsList.arrival?.location}
										/>
									</div>
								</div>
							</div>
						</div>

						{/************ Passengers / Items List *************/}
						{previousListingsList.requestDetails?.map((item, index) => (
							<div key={index} className="mb-6 border-b">
								<div className="2xl:text-lg md:text-base text-sm font-semibold text-bob-search-input-label-color mb-3">
									{listType} {index + 1}
								</div>

								{/********** Order Details **********/}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{/**** AGE / Item Name  ****/}
									<div>
										<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
											{isTravelBuddy ? 'AGE' : 'ITEM'}
										</div>
										<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
											{isTravelBuddy ? item.age : item.item}
										</div>
									</div>

									{/**** Gender / Approx Weight  ****/}
									<div>
										<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
											{isTravelBuddy ? 'Gender' : 'APPROXIMATE WEIGHT IN GRAMS'}
										</div>
										<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
											{isTravelBuddy ? item.gender : item.itemWeight}
										</div>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
									{/**** Item Description ****/}
									<div>
										<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
											{isCourierBuddy && 'DESCRIPTION'}
										</div>
										<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
											{isCourierBuddy && item.itemDescription}
										</div>
									</div>

									{/**** Item Document / Pictures ****/}
									{/* {previousListingsList.requestDetails?.image && ( */}
									<div>
										<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
											{isCourierBuddy && 'IMAGE ATTACHMENT'}
										</div>
										{/* <div className="flex items-center text-primary text-sm">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="mr-1"
												>
													<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
												doc.jpg
											</div> */}
									</div>
									{/* )} */}
								</div>
							</div>
						))}

						{/********** Fee Information ***********/}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
							{/**** Total Weight/Total Passengers  ****/}
							<div>
								<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
									{isCourierBuddy ? 'TOTAL WEIGHT IN GRAMS' : 'Total passengers'}
								</div>
								<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
									{isCourierBuddy
										? previousListingsList.totalWeight
										: previousListingsList.totalPassenger}
								</div>
							</div>

							{/**** Buddy Service Payout Fee  ****/}
							<div>
								<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
									BUDDY SERVICE FEE (YOUR PAYOUT)
								</div>
								<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
									{previousListingsList.totalPrice}
								</div>
							</div>
						</div>

						{/********** Platform Fee  ***********/}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
							<div>
								<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold flex items-center gap-1">
									PLATFORM FEE
									{/***** Platform Fees Tooltip *****/}
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger>
												<Info
													className="size-3.5 2xl:size-5
													text-bob-pricing-block-color"
												/>
											</TooltipTrigger>
											<TooltipContent>
												<p className="max-w-xs 2xl:text-lg text-sm">
													{CONST.sendRequestForm.toolTipText}
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
									${platFormFee}
								</div>
							</div>
							<div>
								<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
									TOTAL PRICE BEFORE TAXES
								</div>
								<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
									${platFormFee + previousListingsList.totalPrice}
								</div>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
