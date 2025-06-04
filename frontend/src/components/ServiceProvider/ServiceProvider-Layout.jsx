import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardTabContent from './Dashboard-TabContent/DashboardTabContent';

export default function ServiceProviderLayout() {
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
			user: {
				name: 'Sarah T.'
				// avatar: '/placeholder-user.jpg'
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
			},
			type: 'Courier Buddy'
		},
		{
			id: 2,
			user: {
				name: 'Sarah T.'
				// avatar: '/placeholder-user.jpg'
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
			},
			type: 'Travel Buddy'
		}
	];

	const activeListings = [
		{
			id: 1,
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
			type: 'Travel Buddy',
			rating: 4.3,
			tag: 'Speaks English'
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
			type: 'Courier Buddy',
			rating: 4.2,
			tag: 'Prefers documents'
		}
	];

	// Toggle between populated and empty states
	const hasData = true;

	return (
		<div className="min-h-screen">
			<div className="mx-auto px-4 py-6">
				{/************ Page Heading Section **************/}
				<header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
					<h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-normal font-merriweather text-bob-tiles-text-color">
						Welcome back, Joe
					</h1>
					<Button
						className="bg-bob-color border-2 border-bob-border-color max-sm:w-full
                  		rounded-2xl 2xl:text-xl 2xl:py-6 2xl:px-5 py-5 px-3 font-semibold"
					>
						Create a listing
					</Button>
				</header>

				{/************** Tabs Options Section ***************/}
				<Tabs defaultValue="dashboard" className="w-full">
					<TabsList className="mb-6 bg-white overflow-x-auto w-full justify-start p-1">
						<TabsTrigger
							value="dashboard"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
						>
							Dashboard
						</TabsTrigger>
						<TabsTrigger
							value="buddy-requests"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
						>
							Buddy Requests
						</TabsTrigger>
						<TabsTrigger
							value="active-listings"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
						>
							Active listings
						</TabsTrigger>
						<TabsTrigger
							value="previous-listings"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
						>
							Previous listings
						</TabsTrigger>
						<TabsTrigger
							value="messages"
							className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
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
						/>
					</TabsContent>

					{/******* Buddy Requests Tab Content ******/}
					<TabsContent value="buddy-requests">
						<div className="text-center 2xl:text-3xl sm:text-2xl text-xl md:mt-[20%] mt-[50%] items-center content-center">
							You have no requests yet.
						</div>
					</TabsContent>

					{/******* Buddy Active Listings Tab Content ******/}
					<TabsContent value="active-listings">
						<div className="text-center 2xl:text-3xl sm:text-2xl text-xl md:mt-[20%] mt-[50%] items-center content-center">
							You have not created any listings.
						</div>
					</TabsContent>

					{/******* Buddy Previous Listings Tab Content ******/}
					<TabsContent value="previous-listings">
						<div className="text-center 2xl:text-3xl sm:text-2xl text-xl md:mt-[20%] mt-[50%] items-center content-center">
							You have not created any listings.
						</div>
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
