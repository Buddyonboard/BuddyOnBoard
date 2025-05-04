import WomenProfilePicPlaceholder from '@/assets/Common/WomenProfilePicPlaceholder.svg';
import SearchField from '@/components/SearchResults/Search-Field';
import { useState } from 'react';
import { BuddyListingCard } from '@/components/SearchResults/Buddy-Listing-Card';
import CONST from '@/utils/Constants';
import FilterByLanguage from '@/components/SearchResults/Filter-By-Language';
import FilterByGender from '@/components/SearchResults/Filter-By-Gender';
import SortByOption from '@/components/SearchResults/Sort-By-Option';
import { useSearchParams } from 'react-router-dom';
import FilterByCourierItem from '@/components/SearchResults/Filter-By-Courier-Item';
import BuddyListingInfo from './Buddy-Listing-Info';

export default function SearchResultsLayout() {
	const [selectedLanguages, setSelectedLanguages] = useState([]);
	const [params] = useSearchParams();

	const checkPackageType = params.get('packageType');

	const userIdParam = params.get('selectedUserId');

	const languages = [
		'English',
		'Hindi',
		'Tamil',
		'Spanish',
		'French',
		'Telugu',
		'Arabic'
	];

	const buddiesListingData = [
		{
			id: '1001',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Travel Buddy',
				preferences: 'English, Hindi, Tamil'
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
			price: 3000.81,
			connectionType: 'Direct',
			connectionLocation: ''
		},
		{
			id: '1002',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Courier Buddy',
				preferences: 'Documents, Electronics'
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
			price: 10000,
			connectionType: '1 Stop',
			connectionLocation: 'LA'
		},
		{
			id: '1003',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Courier Buddy',
				preferences: 'Documents, Electronics'
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
			price: 10000,
			connectionType: '1 Stop',
			connectionLocation: 'LA'
		},
		{
			id: '1004',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Travel Buddy',
				preferences: 'English, Hindi, Tamil'
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
			price: 3000.81,
			connectionType: 'Direct',
			connectionLocation: ''
		},
		{
			id: '1005',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Courier Buddy',
				preferences: 'Documents, Electronics'
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
			price: 10000,
			connectionType: '1 Stop',
			connectionLocation: 'LA'
		},
		{
			id: '1006',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Courier Buddy',
				preferences: 'Documents, Electronics'
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
			price: 10000,
			connectionType: '1 Stop',
			connectionLocation: 'LA'
		}
	];

	const exactMatchTravelBuddies = [
		{
			id: '1001',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Travel Buddy',
				preferences: 'English, Hindi, Tamil'
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
			price: 3000.81,
			connectionType: 'Direct',
			connectionLocation: ''
		},
		{
			id: '1002',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Courier Buddy',
				preferences: 'Documents, Electronics'
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
			price: 10000,
			connectionType: '1 Stop',
			connectionLocation: 'LA'
		},
		{
			id: '1003',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Courier Buddy',
				preferences: 'Documents, Electronics'
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
			price: 10000,
			connectionType: '1 Stop',
			connectionLocation: 'LA'
		}
	];

	const sameDestinationTravelBuddies = [
		{
			id: '1004',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Travel Buddy',
				preferences: 'English, Hindi, Tamil'
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
			price: 3000.81,
			connectionType: 'Direct',
			connectionLocation: ''
		},
		{
			id: '1005',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Courier Buddy',
				preferences: 'Documents, Electronics'
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
			price: 10000,
			connectionType: '1 Stop',
			connectionLocation: 'LA'
		},
		{
			id: '1006',
			name: 'Sarah T.',
			avatar: '/placeholder.svg?height=40&width=40',
			rating: 4.2,
			languages: ['English', 'Hindi', 'Tamil'],
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Courier Buddy',
				preferences: 'Documents, Electronics'
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
			price: 10000,
			connectionType: '1 Stop',
			connectionLocation: 'LA'
		}
	];

	const selectedBuddyInfo = buddiesListingData.filter(
		(item) => item.id === userIdParam
	);

	return (
		<div className="min-h-screen">
			<div className="container mx-auto">
				{/********* Search Section ********/}
				<SearchField />

				{!userIdParam ? (
					/********* To Show Search Listing If Buddy Profile Not Clicked *********/
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
						<div className="lg:col-span-1">
							{/********* Language and Gender Filters ********/}
							<div className="md:p-4">
								<h3 className="text-sm font-semibold text-bob-outline-color mb-4">
									{CONST.buddySearch.filters}
								</h3>

								<div className="flex lg:space-y-4 lg:flex-col lg:gap-0 flex-row gap-5">
									{/********* To Show Filters based on Travel or Courier Buddy *********/}
									{!checkPackageType ? (
										<>
											{/*** Language Filter ***/}
											<FilterByLanguage
												languages={languages}
												setSelectedLanguages={setSelectedLanguages}
												selectedLanguages={selectedLanguages}
											/>

											{/*** Gender Filter ***/}
											<FilterByGender />
										</>
									) : (
										<>
											{/*** Courier Item Filter ***/}
											<FilterByCourierItem />
										</>
									)}
								</div>
							</div>
						</div>

						<div className="lg:col-span-3">
							{/****** Buddy With Exact Destination and Date ******/}
							<div className="flex justify-between items-center mb-4 max-sm:flex-col-reverse max-sm:gap-4">
								<p className="lg:text-base text-xs text-bob-tabs-text-color font-medium">
									{CONST.buddySearch.exactMatch}
								</p>

								{/*** Sort By Option ***/}
								<div className="flex flex-row items-center max-sm:self-baseline">
									<p className="md:text-base text-xs mr-2 text-bob-filters-placeholder-color w-full">
										{CONST.buddySearch.sortBy}
									</p>
									<SortByOption />
								</div>
							</div>

							<div className="space-y-4">
								{/****** Buddy List With Exact Destination and Date ******/}
								{exactMatchTravelBuddies.length > 0 ? (
									exactMatchTravelBuddies.map((buddy) => (
										<BuddyListingCard buddyList={buddy} />
									))
								) : (
									<div className="flex justify-center text-2xl my-10 text-bob-form-label-color text-center">
										{CONST.buddySearch.noResultsFound}
									</div>
								)}

								{/******** Buddy With Same Destination Different Date ********/}
								<div className="lg:text-base text-xs text-bob-tabs-text-color font-medium my-5">
									{CONST.buddySearch.sameDestination}
								</div>

								{/******** Buddy List With Same Destination Different Date ********/}
								{sameDestinationTravelBuddies.map((buddy) => (
									<BuddyListingCard buddyList={buddy} />
								))}
							</div>
						</div>
					</div>
				) : (
					/********* To Show Buddy Profile Info *********/
					<BuddyListingInfo selectedBuddyInfo={selectedBuddyInfo[0]} />
				)}
			</div>
		</div>
	);
}
