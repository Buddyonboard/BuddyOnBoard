import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import CarouselFlight from '@/assets/Landing/CarouselFlight.svg';
import LineSeparator from '@/assets/Common/Line-Separator.svg';
import UserPicOutline from '@/assets/Common/circle-user-round.svg';
import VerifiedIcon from '@/assets/Common/VerifiedIcon.svg';
import BookingsActionButtons from './Bookings-Action-Buttons';
import BookingsSchedule from './Bookings-Schedule';
import BookingStatusDetails from './BookingStatusDetails';

export function BookingCard({ booking }) {
	const isActive = booking.status === 'active';
	const isCancelled = booking.status === 'cancelled';
	const isCompleted = booking.status === 'completed';
	const isPending = booking.status === 'pending';
	const isAccepted = booking.status === 'accepted';

	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl py-0">
			<div className="flex flex-col-reverse md:flex-row items-center md:max-lg:justify-between max-sm:gap-5">
				{/**** User Info Section *****/}
				<div className="pl-5 pb-5 md:w-1/3 w-full">
					{/* Profile Pic and Verified Tag */}
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-3 mt-4">
							{/* Profile Pic */}
							<img
								src={booking.user.avatar || UserPicOutline}
								alt={booking.user.name}
								className="rounded-full h-[42px] w-[42]"
							/>
							<div>
								{/* Profile Name & Verified Icon */}
								<div className="flex items-center gap-2">
									<span className="font-medium">{booking.user.name}</span>

									<img src={VerifiedIcon} alt="VerifiedIcon" className="h-6 w-6" />
								</div>
							</div>
						</div>
					</div>

					{/* Type of Booking - Travel/Courier */}
					<div
						className="mt-3 flex items-center gap-1 rounded-full bg-bob-color
							px-2 py-1 text-xs text-primary-color w-fit"
					>
						<span>{booking.user.type}</span>
					</div>

					{/**** Ratings and Language/Courier Preferences ****/}
					<div className="flex flex-row items-center gap-2">
						{/* Ratings :: Not needed for MVP */}
						{/* <div
							className="mt-3 flex items-center gap-1 rounded-2xl 
                     		bg-bob-higher-rating-color px-2 py-1 text-xs
							text-primary-color w-fit"
						>
							<Star fill="white" size={12} />
							<span>{booking.user.rating}</span>
						</div> */}
						{/* Languages/Courier Preferences */}
						<div className="mt-2">
							<Badge
								variant="outline"
								className="rounded-full bg-bob-language-badge-color text-secondary-color py-1 md:max-lg:w-[170px] max-w-fit md:max-lg:text-[10px]"
							>
								{booking.user.preferences}
							</Badge>
						</div>
					</div>
				</div>

				{/* Vertical Line Separator */}
				<img
					className="md:block hidden w-0.5"
					src={LineSeparator}
					alt="Line Separator"
				/>
				{/* Horizontal Line Separator */}
				<Separator
					className="md:hidden block w-0.5 bg-[#CCCCCC] data-[orientation=horizontal]:w-[90%]"
					orientation="horizontal"
				/>

				<div className="flex flex-col lg:flex-row justify-evenly md:max-lg:items-baseline max-sm:items-center">
					{/*** Flight Details Section ***/}
					<div className="flex flex-1 flex-col lg:p-5 md:py-2.5 py-4 md:pr-10 md:px-0 px-4">
						<div className="flex flex-row md:items-center md:justify-between">
							{/* Departure */}
							<div className="text-start">
								<BookingsSchedule
									time={booking.departure.time}
									date={booking.departure.date}
									location={booking.departure.location}
								/>
							</div>

							{/* Connection */}
							<div className="my-4 flex flex-col items-center md:my-0 text-bob-travel-details-color">
								<div className="relative flex w-20 items-center justify-center md:w-32">
									{/* Journey Flight Icon */}
									<div className="flex flex-col items-center mx-2">
										<img src={CarouselFlight} alt="CarouselFlight" />
									</div>
								</div>
								{booking.connectionType}
								{booking.connectionLocation && (
									<div className="text-xs text-bob-travel-details-color">
										{booking.connectionLocation}
									</div>
								)}
							</div>

							{/* Arrival */}
							<div className="text-end">
								<BookingsSchedule
									time={booking.arrival.time}
									date={booking.arrival.date}
									location={booking.arrival.location}
								/>
							</div>
						</div>
					</div>

					{/* Vertical Line Separator */}
					<img
						className="lg:block hidden w-0.5"
						src={LineSeparator}
						alt="Line Separator"
					/>

					{/*** Actions or Status ***/}
					<div
						className={`flex flex-col gap-2 ${
							isActive
								? 'md:flex-col md:justify-center items-center max-w-2xs'
								: 'justify-center lg:max-w-2xs'
						}`}
					>
						{isActive ? (
							<BookingsActionButtons />
						) : (
							<BookingStatusDetails
								isCancelled={isCancelled}
								isCompleted={isCompleted}
								isPending={isPending}
								isAccepted={isAccepted}
							/>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
}
