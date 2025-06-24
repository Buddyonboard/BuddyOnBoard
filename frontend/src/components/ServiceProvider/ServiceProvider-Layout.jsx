import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardTabContent from './Dashboard-TabContent/DashboardTabContent';
import BuddyRequestTabContent from './BuddyRequests-TabContent.jsx/BuddyRequestTabContent';
import { useState } from 'react';
import ActiveListingsTabContent from './ActiveListings-TabContent.jsx/ActiveListingsTabContent';
import PreviousListingsTabContent from './PreviousListings-TabContent.jsx/PreviousListingsTabContent';
import LayoutPageHeader from './LayoutPageHeader';

export default function ServiceProviderLayout() {
	const [activeTab, setActiveTab] = useState('dashboard');

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

	const activeListings = [
		{
			id: 1,
			providerId: 'SP_123',
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			serviceType: 'Travel Buddy',
			// languagesPreferences: ['English, Tamil'],
			tag: 'Speaks English, Tamil, Telugu',
			priceStarts: 423.21,
			listingStatus: 'active'
		},
		{
			id: 2,
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			serviceType: 'Courier Buddy',
			// courierPreferences: ['Documents'],
			tag: 'Prefers Documents',
			priceStarts: 422.2,
			listingStatus: 'active'
		}
	];

	const previousListings = [
		{
			id: 1,
			providerId: 'SP_123',
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			serviceType: 'Travel Buddy',
			// languagesPreferences: ['English, Tamil'],
			tag: 'Speaks English, Tamil, Telugu',
			priceStarts: 423.21,
			listingStatus: 'completed',
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
			serviceSeekerDetails: {
				name: 'Aman',
				isVerified: true
			},
			totalPassenger: '2',
			serviceType: 'Travel Buddy',
			totalPrice: 90
		},
		{
			id: 2,
			providerId: 'SP_123',
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			serviceType: 'Courier Buddy',
			// courierPreferences: ['Documents'],
			tag: 'Prefers Documents',
			priceStarts: 422.2,
			listingStatus: 'completed',
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
			serviceSeekerDetails: {
				name: 'Aarav',
				isVerified: false
			},
			totalWeight: '1400',
			totalItems: '3',
			totalPrice: 190
		},
		{
			id: 3,
			providerId: 'SP_123',
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			serviceType: 'Courier Buddy',
			// courierPreferences: ['Documents'],
			tag: 'Prefers Documents',
			priceStarts: 422.2,
			listingStatus: 'expired'
		},
		{
			id: 4,
			providerId: 'SP_123',
			departure: {
				time: '08:30 PM',
				date: '23 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '24 August, 2024',
				location: 'YVR, Canada'
			},
			serviceType: 'Travel Buddy',
			// languagesPreferences: ['English, Tamil'],
			tag: 'Speaks English',
			priceStarts: 423.21,
			listingStatus: 'deleted'
		}
	];

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
							activeListings={activeListings}
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
						{activeListings.length > 0 ? (
							activeListings.map((activeListingsList) => (
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
						{previousListings.length > 0 ? (
							previousListings.map((previousListingsList) => (
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
