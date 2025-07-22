import BookingsTabs from '@/components/Bookings/Bookings-Tabs';
import MessageAfterSubmit from '@/components/ReUsable/MessageAfterSubmit';
import { useBookingCancellation } from '@/context/Booking-Cancellation-Context';
import CONST from '@/utils/Constants';

export default function BookingsLayout() {
	const { cancelConfirmed } = useBookingCancellation();

	return (
		<>
			{!cancelConfirmed && (
				<main className="min-h-screen p-2 md:p-6 lg:p-8">
					<div className="mx-auto w-full">
						<h1 className="mb-6 2xl:text-6xl text-4xl font-merriweather font-normal">
							{CONST.bookings.yourBookings}
						</h1>

						{/* Type of Bookings Tabs Toggle */}
						<BookingsTabs />
					</div>
				</main>
			)}

			{/* Success Message : After Cancellation */}
			{cancelConfirmed && (
				<MessageAfterSubmit
					title={CONST.bookings.bookingCancelledTitle}
					description={CONST.bookings.bookingCancelledDescription}
					page="bookingCancellation"
				/>
			)}
		</>
	);
}
