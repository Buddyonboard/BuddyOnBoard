import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingsList from './Bookings-List';
import CONST from '@/utils/Constants';
import { useBookings } from '@/context/API/BookingDataProvider';

export default function BookingsTabs() {
	const { bookings } = useBookings();

	const allBookings = [
		...(bookings?.buddy_requests?.courier_buddy_requests || []),
		...(bookings?.buddy_requests?.travel_buddy_requests || []),
		...(bookings?.buddy_requests?.previous_requests || [])
	];

	const previousBookings = allBookings?.filter(
		(item) =>
			item.listingStatus === 'rejected' ||
			item.listingStatus === 'completed' ||
			item.listingStatus === 'cancelled'
	);

	const upcomingBookings = allBookings?.filter(
		(item) => item.listingStatus === 'active'
	);

	const pendingBookings = allBookings?.filter(
		(item) =>
			item.listingStatus === 'pending' || item.listingStatus === 'accepted'
	);

	return (
		<Tabs defaultValue={CONST.bookings.upComing} className="w-full">
			<TabsList className="mb-6 grid grid-cols-3 w-full 2xl:max-w-2xl md:max-w-md rounded-full bg-bob-tabs-toggle-color 2xl:p-0 p-1">
				{/*** Upcoming Bookings ***/}
				<TabsTrigger
					value={CONST.bookings.upComing}
					className="rounded-full md:text-sm text-[10px] 2xl:text-xl"
				>
					{CONST.bookings.upComing}
				</TabsTrigger>

				{/*** Previous Bookings ***/}
				<TabsTrigger
					value={CONST.bookings.previousBookings}
					className="rounded-full md:text-sm text-[10px] 2xl:text-xl"
				>
					{CONST.bookings.previousBookings}
				</TabsTrigger>

				{/*** Bookings Requests ***/}
				<TabsTrigger
					value={CONST.bookings.bookingRequests}
					className="rounded-full md:text-sm text-[10px] 2xl:text-xl"
				>
					{CONST.bookings.bookingRequests}
				</TabsTrigger>
			</TabsList>

			{/***************** Upcoming Bookings ******************/}
			<TabsContent value={CONST.bookings.upComing}>
				<BookingsList
					noBookings={CONST.bookings.noUpComingBookings}
					bookingsList={upcomingBookings}
				/>
			</TabsContent>

			{/**************** Previous Bookings ******************/}
			<TabsContent value={CONST.bookings.previousBookings}>
				<BookingsList
					noBookings={CONST.bookings.noPreviousBookings}
					bookingsList={previousBookings}
				/>
			</TabsContent>

			{/***************** Bookings Requests ****************/}
			<TabsContent value={CONST.bookings.bookingRequests}>
				<BookingsList
					noBookings={CONST.bookings.nobookingRequests}
					bookingsList={pendingBookings}
				/>
			</TabsContent>
		</Tabs>
	);
}
