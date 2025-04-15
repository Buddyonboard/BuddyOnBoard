import CONST from '@/utils/Constants';
import ReusableLink from '../ReUsable/ReusableLink';
import { Button } from '../ui/button';

export default function BookingStatusDetails({
	isCancelled,
	isCompleted,
	isPending,
	isAccepted
}) {
	return (
		<>
			{/*** Booking Status :: Completed/Cancelled ***/}
			{(isCancelled || isCompleted) && (
				<p
					className="text-center text-sm font-bold text-bob-form-label-color
                    lg:pl-10 md:pl-15 pl-5"
				>
					{isCancelled && CONST.bookings.bookingCancelledTitle}
					{isCompleted && CONST.bookings.bookingCompletedTitle}
				</p>
			)}

			{/*** Booking Status :: Pending ***/}
			{isPending && (
				<div className="flex flex-col md:max-lg:flex-row md:max-lg:mb-5 text-start gap-2 md:max-lg:gap-6 md:max-lg:px-0 px-2">
					<div>
						<p className="text-bob-form-label-color font-medium md:max-lg:text-sm">
							Request sent on 16th January, 2025
						</p>
						<p className="text-bob-icon-placeholder-color text-sm font-normal">
							2 passengers
						</p>
					</div>
					<ReusableLink
						to="/"
						linkName={CONST.bookings.editBookingRequest}
						className="text-bob-color font-bold lg:text-xl text-sm"
					/>
				</div>
			)}

			{/*** Booking Status :: Accepted ***/}
			{isAccepted && (
				<div className="flex lg:flex-col flex-row text-start md:max-lg:gap-7 md:max-lg:px-0 md:max-lg:mb-5 gap-3 px-2">
					<div>
						<p className="text-bob-success-color font-bold md:text-base text-sm">
							Request accepted!
						</p>
						<p className="text-bob-icon-placeholder-color text-sm font-normal">
							2 passengers
						</p>
					</div>
					<Button
						className="bg-bob-color border-2 border-bob-border-color
                        hover:bg-bob-color lg:w-60 md:w-42 w-33 cursor-pointer rounded-2xl lg:py-5"
					>
						<ReusableLink
							to="/"
							linkName={CONST.bookings.payBookingRequest}
							className="text-primary-color font-bold md:text-base text-xs"
						/>
					</Button>
				</div>
			)}
		</>
	);
}
