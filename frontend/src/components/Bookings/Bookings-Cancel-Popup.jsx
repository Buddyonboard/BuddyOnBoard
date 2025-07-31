import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import CONST from '@/utils/Constants';
import BookingsSchedule from './Bookings-Schedule';
import { useBookingCancellation } from '@/context/Booking-Cancellation-Context';
import ServiceCategoryTag from '../ReUsable/Service-Seeker/Service-Category-Tag';
import VerifiedBuddyName from '../ReUsable/Service-Seeker/Verified-Buddy-Name';
import BuddyCardAvatar from '../ReUsable/Service-Seeker/Buddy-Card-Avatar';
import FlightStopType from '../ReUsable/Service-Seeker/Flight-Stop-Type';

export default function BookingCancellationPopup({
	open,
	setOpen,
	onClose,
	booking
}) {
	const [reason, setReason] = useState(null);
	const [customReason, setCustomReason] = useState(null);
	const [step, setStep] = useState('reason');
	const { setCancelConfirmed } = useBookingCancellation();

	/*** Handle confirmation logic here ***/
	const handleConfirm = () => {
		setOpen(false);
		setCancelConfirmed((prev) => !prev);
	};

	const firstName = booking?.service_Provider_Details?.userDetails?.firstName;

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md p-0 gap-0 rounded-xl">
				{step === 'reason' ? (
					<div className="p-6 space-y-6 mt-5">
						<DialogHeader>
							<DialogTitle className="md:text-3xl text-xl">
								{CONST.bookingsCancelDialog.whyCancelling}
							</DialogTitle>
						</DialogHeader>
						<RadioGroup
							value={reason || ''}
							onValueChange={(value) => setReason(value)}
							className="space-y-3"
						>
							<div className="flex items-start space-x-2">
								<RadioGroupItem value="change-plans" id="change-plans" />
								<Label htmlFor="change-plans" className="font-normal leading-tight">
									{CONST.bookingsCancelDialog.travelBuddy.changeOfPlans}
								</Label>
							</div>

							<div className="flex items-start space-x-2">
								<RadioGroupItem value="found-alternative" id="found-alternative" />
								<Label
									htmlFor="found-alternative"
									className="font-normal leading-tight"
								>
									{CONST.bookingsCancelDialog.travelBuddy.foundAnAlternative}
								</Label>
							</div>

							<div className="flex items-start space-x-2">
								<RadioGroupItem
									value="companion-unavailable"
									id="companion-unavailable"
								/>
								<Label
									htmlFor="companion-unavailable"
									className="font-normal leading-tight"
								>
									{CONST.bookingsCancelDialog.travelBuddy.companionUnavailable}
								</Label>
							</div>

							<div className="flex items-start space-x-2">
								<RadioGroupItem value="safety-concerns" id="safety-concerns" />
								<Label htmlFor="safety-concerns" className="font-normal leading-tight">
									{CONST.bookingsCancelDialog.travelBuddy.safetyConcerns}
								</Label>
							</div>

							<div className="flex items-start space-x-2">
								<RadioGroupItem value="platform-issues" id="platform-issues" />
								<Label htmlFor="platform-issues" className="font-normal leading-tight">
									{CONST.bookingsCancelDialog.travelBuddy.platformIssues}
								</Label>
							</div>

							<div className="flex items-start space-x-2">
								<RadioGroupItem value="other" id="other" />
								<Label htmlFor="other" className="font-normal">
									{CONST.bookingsCancelDialog.other}
								</Label>
							</div>
						</RadioGroup>

						{reason === 'other' && (
							<Textarea
								placeholder="Add your reason here"
								value={customReason}
								onChange={(e) => setCustomReason(e.target.value)}
								className="min-h-[100px]"
							/>
						)}

						<Button
							className="w-full bg-bob-color border-2 border-bob-border-color rounded-2xl text-xl font-semibold p-5"
							size="lg"
							onClick={() => setStep('confirm')}
							disabled={!reason}
						>
							Next
						</Button>
					</div>
				) : (
					<div>
						<div className="p-6 space-y-6 mt-5">
							<DialogHeader>
								<DialogTitle className="md:text-3xl text-xl">
									Confirm cancellation
								</DialogTitle>
							</DialogHeader>

							<div className="flex justify-between">
								<div>
									<p className="text-base text-bob-form-label-color">You paid</p>
									<p className="text-xl font-medium">
										${booking?.totalAmount?.totalPrice}
									</p>
								</div>
								<div className="text-left">
									<p className="text-base text-bob-form-label-color">Your refund</p>
									<p className="text-xl font-medium">
										${booking?.totalAmount?.buddyServiceFee}
									</p>
								</div>
							</div>
						</div>

						<Separator className="text-bob-border-outline-color data-[orientation=horizontal]:w-[90%] data-[orientation=horizontal]:h-0.5 ml-5" />

						<div className="p-6 space-y-6">
							<h3 className="font-medium text-base">Trip details</h3>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-3 mt-4">
										{/**** Profile Pic ****/}
										<BuddyCardAvatar userName={firstName} />

										{/*** Profile Name & Verified Icon ***/}
										<VerifiedBuddyName
											userName={firstName}
											isVerified={booking?.service_Provider_Details?.isVerified}
										/>
									</div>
								</div>
								{/******* Travel/Courier Buddy ******/}
								<ServiceCategoryTag serviceType={booking?.serviceType} />
							</div>

							{/******** Travel Details ********/}
							<div className="flex flex-1 flex-col lg:p-5 md:py-2.5 py-4 md:px-0 px-4">
								<div className="flex flex-row md:items-center md:justify-between">
									{/******** Departure ********/}
									<div className="text-start">
										<BookingsSchedule
											time={booking?.trip_details?.departureTime}
											date={booking?.trip_details?.departureDate}
											location={booking?.trip_details?.departureAirport}
										/>
									</div>

									{/**** Flight Connection Type ****/}
									<FlightStopType
										connectionType={booking?.trip_details?.stops}
										connectionLocation={booking?.trip_details?.stopAirports}
									/>

									{/******** Arrival ********/}
									<div className="text-end">
										<BookingsSchedule
											time={booking?.trip_details?.arrivalTime}
											date={booking?.trip_details?.arrivalDate}
											location={booking?.trip_details?.arrivalAirport}
										/>
									</div>
								</div>
							</div>

							<p className="text-sm text-bob-form-label-color">
								{CONST.bookingsCancelDialog.cancellationTerms}
							</p>

							<Button
								className="w-full border-2 border-bob-border-color
								bg-bob-color rounded-2xl text-xl p-5"
								onClick={handleConfirm}
							>
								Confirm cancellation
							</Button>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
