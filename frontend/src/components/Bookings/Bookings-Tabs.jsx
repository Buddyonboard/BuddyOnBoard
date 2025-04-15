import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingsList from './Bookings-List';
import CONST from '@/utils/Constants';
import { useBookings } from '@/context/API/BookingDataProvider';

export default function BookingsTabs() {
	const { bookings } = useBookings();

	const previousBookings = bookings.filter(
		(item) => item.status === 'cancelled' || item.status === 'completed'
	);

	const upcomingBookings = bookings.filter((item) => item.status === 'active');

	const pendingBookings = bookings.filter(
		(item) => item.status === 'pending' || item.status === 'accepted'
	);

	return (
		<Tabs defaultValue={CONST.bookings.upComing} className="w-full">
			<TabsList className="mb-6 grid grid-cols-3 w-full md:max-w-md rounded-full bg-bob-tabs-toggle-color p-1">
				{/*** Upcoming Bookings ***/}
				<TabsTrigger
					value={CONST.bookings.upComing}
					className="rounded-full md:text-sm text-[10px]"
				>
					{CONST.bookings.upComing}
				</TabsTrigger>

				{/*** Previous Bookings ***/}
				<TabsTrigger
					value={CONST.bookings.previousBookings}
					className="rounded-full md:text-sm text-[10px]"
				>
					{CONST.bookings.previousBookings}
				</TabsTrigger>

				{/*** Bookings Requests ***/}
				<TabsTrigger
					value={CONST.bookings.bookingRequests}
					className="rounded-full md:text-sm text-[10px]"
				>
					{CONST.bookings.bookingRequests}
				</TabsTrigger>
			</TabsList>

			{/*** Upcoming Bookings ***/}
			<TabsContent value={CONST.bookings.upComing}>
				<BookingsList
					noBookings={CONST.bookings.noUpComingBookings}
					bookingsList={upcomingBookings}
				/>
			</TabsContent>

			{/*** Previous Bookings ***/}
			<TabsContent value={CONST.bookings.previousBookings}>
				<BookingsList
					noBookings={CONST.bookings.noPreviousBookings}
					bookingsList={previousBookings}
				/>
			</TabsContent>

			{/*** Bookings Requests ***/}
			<TabsContent value={CONST.bookings.bookingRequests}>
				<BookingsList
					noBookings={CONST.bookings.nobookingRequests}
					bookingsList={pendingBookings}
				/>
			</TabsContent>
		</Tabs>
	);
}
