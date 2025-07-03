import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardTabContent from './Dashboard-TabContent/DashboardTabContent';
import BuddyRequestTabContent from './BuddyRequests-TabContent.jsx/BuddyRequestTabContent';
import { useEffect, useState } from 'react';
import ActiveListingsTabContent from './ActiveListings-TabContent.jsx/ActiveListingsTabContent';
import PreviousListingsTabContent from './PreviousListings-TabContent.jsx/PreviousListingsTabContent';
import LayoutPageHeader from './LayoutPageHeader';
import API_URL from '../../../environments/Environment-dev';
import { getuserProfile } from '@/utils/localStorageHelper';
import axios from 'axios';

export default function ServiceProviderLayout() {
	const [activeTab, setActiveTab] = useState('dashboard');
	const [activeListingsMain, setActiveListingsMain] = useState([]);
	const [previousListingsMain, setPreviousListingsMain] = useState([]);

	// Sample data for the dashboard
	const upcomingTrip = {
		contact: {
			name: 'Sarah T.',
			avatar: '/placeholder-user.jpg',
			type: 'Courier Buddy'
		},
		departure: {
			time: '08:30 AM',
			date: '22 August, 2024',
			location: 'LAX, USA'
		},
		arrival: {
			time: '12:15 PM',
			date: '22 August, 2024',
			location: 'YVR, Canada'
		}
	};

	const buddyRequests = [
		{
			id: 1,
			departure: {
				time: '08:30 PM',
				date: '22 August, 2025',
				location: 'Delhi, IND'
			},
			arrival: {
				time: '12:15 PM',
				date: '23 August, 2025',
				location: 'YVR, Canada'
			},
			requestDetails: [
				{
					age: '12',
					gender: 'Male'
				},
				{
					age: '69',
					gender: 'Female'
				},
				{
					age: '71',
					gender: 'No Preference'
				}
			],
			serviceProviderDetails: {
				name: 'Aman',
				isVerified: true
			},
			totalPassenger: '2',
			serviceType: 'Travel Buddy',
			totalPrice: 90
		},
		{
			id: 2,
			departure: {
				time: '08:30 PM',
				date: '22 August, 2025',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '23 August, 2025',
				location: 'YVR, Canada'
			},
			requestDetails: [
				{
					item: 'Documents',
					itemWeight: '200',
					itemDescription: 'These contain important papers.'
				},
				{
					item: 'Electronics (Open box without invoice)',
					itemWeight: '1200',
					itemDescription:
						'I do not have an invoice but I hope the serial number images work. I am sending out earphones.'
				}
			],
			serviceProviderDetails: {
				name: 'Aarav',
				isVerified: false
			},
			totalWeight: '1400',
			totalItems: '3',
			totalPrice: 190,
			serviceType: 'Courier Buddy'
		},
		{
			id: 3,
			departure: {
				time: '08:30 PM',
				date: '22 August, 2025',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '23 August, 2025',
				location: 'YVR, Canada'
			},
			requestDetails: [
				{
					item: 'Documents',
					itemWeight: '200',
					itemDescription: 'These contain important papers.'
				},
				{
					item: 'Electronics (Open box without invoice)',
					itemWeight: '1200',
					itemDescription:
						'I do not have an invoice but I hope the serial number images work. I am sending out earphones.'
				}
			],
			serviceProviderDetails: {
				name: 'Aarav',
				isVerified: false
			},
			totalWeight: '1400',
			totalItems: '3',
			totalPrice: 190,
			serviceType: 'Courier Buddy'
		}
	];

	const buddyRequestsData = [
		{
			id: 1,
			departure: {
				time: '08:30 PM',
				date: '22 August, 2025',
				location: 'Delhi, IND'
			},
			arrival: {
				time: '12:15 PM',
				date: '23 August, 2025',
				location: 'YVR, Canada'
			},
			requestDetails: [
				{
					age: '12',
					gender: 'Male'
				},
				{
					age: '69',
					gender: 'Female'
				},
				{
					age: '71',
					gender: 'No Preference'
				}
			],
			serviceProviderDetails: {
				name: 'Aman',
				isVerified: true
			},
			totalPassenger: '2',
			serviceType: 'Travel Buddy',
			totalPrice: 90
		},
		{
			id: 2,
			departure: {
				time: '08:30 PM',
				date: '22 August, 2025',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '23 August, 2025',
				location: 'YVR, Canada'
			},
			requestDetails: [
				{
					item: 'Documents',
					itemWeight: '200',
					itemDescription: 'These contain important papers.'
				},
				{
					item: 'Electronics (Open box without invoice)',
					itemWeight: '1200',
					itemDescription:
						'I do not have an invoice but I hope the serial number images work. I am sending out earphones.'
				}
			],
			serviceProviderDetails: {
				name: 'Aarav',
				isVerified: false
			},
			totalWeight: '1400',
			totalItems: '3',
			totalPrice: 190,
			serviceType: 'Courier Buddy'
		}
	];

	/********* To Fetch All Active Buddy Listings Data *********/
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

	// Toggle between populated and empty states
	const hasData = true;

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
							upcomingTrip={upcomingTrip}
							buddyRequests={buddyRequests}
							activeListings={activeListingsMain}
							hasData={hasData}
							setActiveTab={setActiveTab}
						/>
					</TabsContent>

					{/******* Buddy Requests Tab Content ******/}
					<TabsContent value="buddy-requests" className="space-y-4">
						{buddyRequestsData.length > 0 ? (
							buddyRequestsData.map((buddyRequestsList) => (
								<BuddyRequestTabContent buddyRequestsList={buddyRequestsList} />
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
