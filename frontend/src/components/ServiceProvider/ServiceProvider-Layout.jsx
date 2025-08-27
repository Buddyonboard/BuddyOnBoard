import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardTabContent from './Dashboard-TabContent/DashboardTabContent';
import BuddyRequestTabContent from './BuddyRequests-TabContent.jsx/BuddyRequestTabContent';
import { useEffect, useState } from 'react';
import ActiveListingsTabContent from './ActiveListings-TabContent.jsx/ActiveListingsTabContent';
import PreviousListingsTabContent from './PreviousListings-TabContent.jsx/PreviousListingsTabContent';
import LayoutPageHeader from './LayoutPageHeader';
import API_URL from '../../../environments/Environment-dev';
import axios from 'axios';
import { getuserProfile } from '@/utils/localStorageHelper';

export default function ServiceProviderLayout() {
	const [activeTab, setActiveTab] = useState('dashboard');
	const [activeListingsMain, setActiveListingsMain] = useState([]);
	const [previousListingsMain, setPreviousListingsMain] = useState([]);
	const [upcomingTrips, setUpcomingTrips] = useState([]);
	const [buddyRequestsList, setBuddyRequestsList] = useState([]);

	/*********************** Get latest buddy requests ****************************/
	useEffect(() => {
		const fetchBuddyRequests = async () => {
			try {
				const res = await axios.get(`${API_URL}/get-buddy-requests`);

				const requestsList = res?.data?.data;

				const pendingBookings = requestsList?.filter(
					(item) => item.listingStatus === 'pending'
				);

				const activeTrips = requestsList?.filter(
					(item) => item.listingStatus === 'active'
				);

				/**** To retreive upcoming latest booking ****/
				const getNextBooking = (activeTrips) => {
					const now = new Date();

					const upcoming = activeTrips
						.map((b) => ({
							...b,
							departureDate: new Date(b.trip_details.departureDate)
						})) // convert to Date
						.filter((b) => b.departureDate > now) // only future
						.sort((a, b) => a.departureDate - b.departureDate); // nearest first

					return upcoming;
				};

				setUpcomingTrips(getNextBooking(activeTrips));
				setBuddyRequestsList(pendingBookings);
			} catch (err) {
				// console.error('Failed to fetch buddy requests:', err);
				// showErrorToast('Failed to fetch buddy requests');
			}
		};

		fetchBuddyRequests();
	}, []);

	/*************** To Fetch All Active Buddy Listings Data ******************/
	useEffect(() => {
		const fetchActiveBuddyListings = async () => {
			const user_id = getuserProfile()._id;

			try {
				const response = await axios.get(`${API_URL}/getBuddyListings/${user_id}`);

				const buddyListingData = response.data.data.buddy_Listing_Details;

				/***** Segregate based on listing type ****/
				const travel = Array.isArray(buddyListingData?.travel_listing)
					? buddyListingData.travel_listing
					: [];
				const courier = Array.isArray(buddyListingData?.courier_listing)
					? buddyListingData.courier_listing
					: [];
				const previousListing = Array.isArray(buddyListingData?.previous_listings)
					? buddyListingData.previous_listings
					: [];

				/**** Combine Data of Travel and Courier Listing ****/
				const combinedData = [...travel, ...courier];

				/******* Filter Data based on active listing status ********/
				const activeListingFiltered = combinedData.filter(
					(item) => item.listingStatus === 'active'
				);

				/******* Filter Data based on deleted listing status ********/
				const previousListingFiltered = previousListing.filter(
					(item) => item.listingStatus === 'deleted'
				);

				setActiveListingsMain(activeListingFiltered);
				setPreviousListingsMain(previousListingFiltered);
			} catch (error) {
				// console.error('Error fetching listings:', error);
			}
		};

		fetchActiveBuddyListings();
	}, []);

	return (
		<div className="min-h-screen">
			<div className="mx-auto px-4 py-6">
				{/************ Page Heading Section **************/}
				<LayoutPageHeader />

				{/************** Tabs Options Section ***************/}
				<Tabs
					defaultValue="dashboard"
					className="w-full"
					value={activeTab}
					onValueChange={setActiveTab}
				>
					<TabsList className="mb-6 bg-white overflow-x-auto w-full justify-start p-1">
						<TabsTrigger
							value="dashboard"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
							onClick={() => setActiveTab('dashboard')}
						>
							Dashboard
						</TabsTrigger>
						<TabsTrigger
							value="buddy-requests"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
							onClick={() => setActiveTab('buddy-requests')}
						>
							Buddy Requests
						</TabsTrigger>
						<TabsTrigger
							value="active-listings"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
							onClick={() => setActiveTab('active-listings')}
						>
							Active listings
						</TabsTrigger>
						<TabsTrigger
							value="previous-listings"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
							onClick={() => setActiveTab('previous-listings')}
						>
							Previous listings
						</TabsTrigger>
						<TabsTrigger
							value="messages"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
							onClick={() => setActiveTab('messages')}
						>
							Messages
						</TabsTrigger>
					</TabsList>

					{/******* Buddy Dashboard Tab Content ******/}
					<TabsContent value="dashboard">
						<DashboardTabContent
							upcomingTrip={upcomingTrips}
							buddyRequests={buddyRequestsList}
							activeListings={activeListingsMain}
							setActiveTab={setActiveTab}
						/>
					</TabsContent>

					{/******* Buddy Requests Tab Content ******/}
					<TabsContent value="buddy-requests" className="space-y-4">
						{buddyRequestsList.length > 0 ? (
							buddyRequestsList.map((requests) => (
								<BuddyRequestTabContent buddyRequestsList={requests} />
							))
						) : (
							<div className="text-center 2xl:text-3xl sm:text-2xl text-xl md:mt-[20%] mt-[50%] items-center content-center">
								You have no requests yet.
							</div>
						)}
					</TabsContent>

					{/******* Buddy Active Listings Tab Content ******/}
					<TabsContent value="active-listings">
						{activeListingsMain.length > 0 ? (
							activeListingsMain.map((activeListingsList) => (
								<ActiveListingsTabContent activeListingsList={activeListingsList} />
							))
						) : (
							<div className="text-center 2xl:text-3xl sm:text-2xl text-xl md:mt-[20%] mt-[50%] items-center content-center">
								You have not created any listings.
							</div>
						)}
					</TabsContent>

					{/******* Buddy Previous Listings Tab Content ******/}
					<TabsContent value="previous-listings">
						{previousListingsMain.length > 0 ? (
							previousListingsMain.map((previousListingsList) => (
								<PreviousListingsTabContent
									previousListingsList={previousListingsList}
								/>
							))
						) : (
							<div className="text-center 2xl:text-3xl sm:text-2xl text-xl md:mt-[20%] mt-[50%] items-center content-center">
								You have not created any listings.
							</div>
						)}
					</TabsContent>

					{/******* Buddy Messages Tab Content ******/}
					<TabsContent value="messages">
						<div className="text-center 2xl:text-3xl sm:text-2xl text-xl md:mt-[20%] mt-[50%] items-center content-center">
							You have no messages yet.
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
