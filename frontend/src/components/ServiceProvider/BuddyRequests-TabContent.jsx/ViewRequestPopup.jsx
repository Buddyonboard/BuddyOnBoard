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
import RequestActionsButton from './RequestActionsButton';
import API_URL from '../../../../environments/Environment-dev';

export default function ViewRequestPopup({ open, onClose, buddyRequestsList }) {
	const serviceType = buddyRequestsList?.serviceType;
	const departure = buddyRequestsList?.trip_details?.departureAirport;
	const arrival = buddyRequestsList?.trip_details?.arrivalAirport;

	const isCourierBuddy = serviceType === 'Courier Buddy';
	const isTravelBuddy = serviceType === 'Travel Buddy';
	const detailsType = isTravelBuddy ? 'passengers_List' : 'courier_Items_List';
	const listType = isTravelBuddy ? 'Passenger' : 'Courier Item';

	/********* Reusable Document/Picture UI render **********/
	const renderAttachment = (file, label) => {
		if (!file) return null;

		return (
			<div className="mb-3">
				<div
					className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color
				 mb-1 font-semibold"
				>
					{isCourierBuddy && label}
				</div>
				<div
					className={`flex items-center text-sm cursor-pointer 
					text-bob-success-color`}
				>
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
					<a href={`${API_URL}/buddy-request-download/${file}`}>
						{file.split('-').pop()}
					</a>
				</div>
			</div>
		);
	};

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
						{/************ Passengers / Items List *************/}
						{buddyRequestsList?.[detailsType]?.map((item, index) => (
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
											{isTravelBuddy ? item.age : item.itemType}
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

									{/******* Item Picture ********/}
									{renderAttachment(item?.itemPicture, 'IMAGE ATTACHMENT')}

									{/******* Item Document ********/}
									{renderAttachment(item?.itemDocument, 'DOCUMENT ATTACHMENT')}
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
										? buddyRequestsList?.totalItemsWeight
										: buddyRequestsList?.passengerCount}
								</div>
							</div>

							{/**** Buddy Service Payout Fee  ****/}
							<div>
								<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
									BUDDY SERVICE FEE (YOUR PAYOUT)
								</div>
								<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
									${buddyRequestsList?.totalAmount?.buddyServiceFee}
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
							{/**** Platform Fee  ****/}
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
									${buddyRequestsList?.totalAmount?.platformFee}
								</div>
							</div>
							<div>
								<div className="2xl:text-base md:text-sm text-xs text-bob-pricing-block-color mb-1 font-semibold">
									TOTAL PRICE BEFORE TAXES
								</div>
								<div className="2xl:text-xl md:text-base text-sm font-normal text-bob-accordion-content-color">
									${buddyRequestsList?.totalAmount?.totalPrice}
								</div>
							</div>
						</div>

						{/************ Service Seeker Information ***********/}
						<div className="pt-4 border-t">
							{/***** Profile Pic and Verified Tag *****/}
							<div className="flex items-center gap-3 mt-4">
								{/*** Profile Pic ***/}
								<BuddyCardAvatar
									userName={buddyRequestsList?.service_Seeker_Details?.firstName}
								/>
								{/*** Profile Name & Verified Icon ***/}
								<VerifiedBuddyName
									userName={buddyRequestsList?.service_Seeker_Details?.firstName}
									isVerified={buddyRequestsList?.service_Seeker_Details?.emailVerified}
								/>
							</div>

							{/************* Trip Details Section **************/}
							<div className="flex flex-1 flex-col 2xl:pt-7 lg:pt-5 md:pt-3 pt-4 md:px-0">
								<div className="flex flex-row md:items-center md:justify-between">
									{/**** Departure ****/}
									<div className="text-start">
										<TripSchedule
											time={buddyRequestsList?.trip_details?.departureTime}
											date={buddyRequestsList?.trip_details?.departureDate}
											location={buddyRequestsList?.trip_details?.departureAirport}
										/>
									</div>

									{/**** Flight Connection Type ****/}
									<FlightStopType
										connectionType={buddyRequestsList?.trip_details?.stops}
										connectionLocation={buddyRequestsList?.trip_details?.stopAirports}
									/>

									{/**** Arrival ****/}
									<div className="text-end">
										<TripSchedule
											time={buddyRequestsList?.trip_details?.arrivalTime}
											date={buddyRequestsList?.trip_details?.arrivalDate}
											location={buddyRequestsList?.trip_details?.arrivalAirport}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/*********** Request Accept / Decline Action Buttons ***********/}
					<RequestActionsButton
						buddyRequestsList={buddyRequestsList}
						type="requestPopup"
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
