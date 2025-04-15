import { BookingCard } from './Bookings-Card';

export default function BookingsList({ noBookings, bookingsList }) {
	return (
		<div className="space-y-4">
			{bookingsList?.length > 0 ? (
				bookingsList.map((booking) => (
					<BookingCard key={booking.id} booking={booking} />
				))
			) : (
				/* Show message if no bookings there */
				<div className="flex h-40 items-center justify-center">
					<p className="text-bob-form-label-color">{noBookings}</p>
				</div>
			)}
		</div>
	);
}
