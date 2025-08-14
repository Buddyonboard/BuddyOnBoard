import BookingPaymentStatusPopup from '@/components/Bookings/Bookings-PaymentStatus-Popup';
import BookingsTabs from '@/components/Bookings/Bookings-Tabs';
import MessageAfterSubmit from '@/components/ReUsable/MessageAfterSubmit';
import { useBookingCancellation } from '@/context/Booking-Cancellation-Context';
import CONST from '@/utils/Constants';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function BookingsLayout() {
	const { cancelConfirmed } = useBookingCancellation();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleClose = () => {
		navigate('/bookings');
		setOpen(false);
	};
	const [searchParams] = useSearchParams();
	const bookingId = searchParams.get('bookingId');
	const status = searchParams.get('status');
	const [renderTime, setRenderTime] = useState('');

	/******** Capture Date and Time for Payment Failed/Pending Status ********/
	useEffect(() => {
		if (!bookingId) return; // Only run if bookingId exists

		const now = new Date();
		const options = { month: 'long', day: 'numeric', year: 'numeric' };
		const dateStr = now.toLocaleDateString('en-US', options);
		const timeStr = now
			.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			})
			.toLowerCase();

		setRenderTime(`${dateStr} at ${timeStr}`);
	}, [bookingId]);

	/******** BookingId and Status there in params to show popup message ********/
	useEffect(() => {
		if (status && bookingId) {
			setOpen(true);
		}
	}, [bookingId, status]);

	return (
		<>
			{!cancelConfirmed && (
				<main className="min-h-screen p-2 md:p-6 lg:p-8">
					<div className="mx-auto w-full">
						<h1 className="mb-6 2xl:text-6xl text-4xl font-merriweather font-normal">
							{CONST.bookings.yourBookings}
						</h1>

						{/************ Type of Bookings Tabs Toggle ************/}
						<BookingsTabs />
					</div>
				</main>
			)}

			{/*********** Success Message : After Cancellation ************/}
			{cancelConfirmed && (
				<MessageAfterSubmit
					title={CONST.bookings.bookingCancelledTitle}
					description={CONST.bookings.bookingCancelledDescription}
					page="bookingCancellation"
				/>
			)}

			{/********** Popup Message : After Payment Failed/Pending ************/}
			{status && (
				<BookingPaymentStatusPopup
					status={status}
					open={open}
					setOpen={setOpen}
					onClose={handleClose}
					bookingId={bookingId}
					renderTime={renderTime}
				/>
			)}
		</>
	);
}
