// import WomenProfilePicPlaceholder from '@/assets/Common/WomenProfilePicPlaceholder.svg';
import SearchField from '@/components/SearchResults/Search-Field';
import { useEffect, useState } from 'react';
import { BuddyListingCard } from '@/components/SearchResults/Buddy-Listing-Card';
import CONST from '@/utils/Constants';
import FilterByLanguage from '@/components/SearchResults/Filter-By-Language';
import FilterByGender from '@/components/SearchResults/Filter-By-Gender';
import SortByOption from '@/components/SearchResults/Sort-By-Option';
import { useSearchParams } from 'react-router-dom';
import FilterByCourierItem from '@/components/SearchResults/Filter-By-Courier-Item';
import BuddyListingInfo from './Buddy-Listing-Info';
import useSearchBuddyListings from '@/hooks/useSearchBuddyListings';
import {
	extractUniqueLanguages,
	filterBuddyListing,
	sortBuddyListings
} from '@/utils/extractUniqueLanguageList';
import ListingCardSkeleton from '@/components/Loaders/Listing-Card-Skeleton';

export default function SearchResultsLayout() {
	const [selectedLanguages, setSelectedLanguages] = useState([]);
	const [selectedGender, setSelectedGender] = useState('');
	const [selectedCourierFilter, setSelectedCourierFilter] = useState('');
	const [sortBy, setSortBy] = useState('relevance');
	const [exactMatchListingData, setExactMatchListingData] = useState([]);
	const [flexiMatchListingData, setFlexiMatchListingData] = useState([]);
	const [selectedBuddyDetails, setSelectedBuddyDetails] = useState(null);
	const [params] = useSearchParams();
	const { results, loading, error, search } = useSearchBuddyListings();

	/******** Convert URLSearchParams to plain object ********/
	useEffect(() => {
		const paramsObj = {};
		params.forEach((value, key) => {
			paramsObj[key] = value;
		});

		search(paramsObj);
	}, [params]); // Runs whenever URL params change

	const checkPackageType = params.get('packageType');
	const checkServiceType = params.get('serviceType');
	const userIdParam = params.get('selectedUserId');

	const serviceTypeValue =
		checkServiceType === 'travel' ? 'Travel Buddy' : 'Courier Buddy';

	/************** Extract Full List of Languages ****************/
	const languages = extractUniqueLanguages(results);

	/********** To check if any filters applied ***********/
	const isFilterApplied =
		selectedLanguages.length > 0 ||
		selectedGender !== '' ||
		selectedCourierFilter !== '';

	/************************** To Retrive Buddy Data ************************/
	useEffect(() => {
		if (!results) return;

		let filteredExactMatches = results.exactMatches;
		let filteredFlexibleMatches = results.flexibleDateMatches;

		/*********** Apply filters if active ************/
		if (isFilterApplied) {
			filteredExactMatches = results.exactMatches.filter((item) =>
				filterBuddyListing(
					item,
					selectedLanguages,
					selectedGender,
					selectedCourierFilter
				)
			);

			filteredFlexibleMatches = results.flexibleDateMatches.filter((item) =>
				filterBuddyListing(
					item,
					selectedLanguages,
					selectedGender,
					selectedCourierFilter
				)
			);
		}

		/*********** Apply sorting regardless of filters ************/
		const sortedExact = sortBuddyListings(filteredExactMatches, sortBy);
		const sortedFlexi = sortBuddyListings(filteredFlexibleMatches, sortBy);

		/*********** Update visible listings ************/
		setExactMatchListingData(sortedExact);
		setFlexiMatchListingData(sortedFlexi);
	}, [
		selectedLanguages,
		selectedGender,
		selectedCourierFilter,
		results,
		sortBy
	]);

	/************ Search for the matching selected buddy listing_id *************/
	const combinedSearchResults = [
		...results.exactMatches,
		...results.flexibleDateMatches
	];

	useEffect(() => {
		if (!results || !userIdParam) return;

		const matchedBuddy = combinedSearchResults.find(
			(item) =>
				(serviceTypeValue === 'Travel Buddy' &&
					item?.buddy_Listing_Details?.travel_listing?.listing_id === userIdParam) ||
				(serviceTypeValue === 'Courier Buddy' &&
					item?.buddy_Listing_Details?.courier_listing?.listing_id === userIdParam)
		);

		setSelectedBuddyDetails(matchedBuddy);
	}, [results, userIdParam, serviceTypeValue]);

	/********* Selected Buddy Info Loading State **********/
	if (userIdParam && !selectedBuddyDetails) {
		return <div className="text-center mt-10">Loading buddy info...</div>;
	}

	return (
		<div className="min-h-screen">
			<div className="max-lg:container max-lg:mx-auto">
				{/********* Search Section ********/}
				<SearchField />

				{!userIdParam ? (
					/********* To Show Search Listing If Buddy Profile Not Clicked *********/
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
						<div className="lg:col-span-1">
							{/********* Language and Gender Filters ********/}
							<div className="md:p-4">
								<h3 className="2xl:text-xl text-sm font-semibold text-bob-outline-color mb-4">
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
											<FilterByGender setSelectedGender={setSelectedGender} />
										</>
									) : (
										<>
											{/*** Courier Item Filter ***/}
											<FilterByCourierItem
												setSelectedCourierFilter={setSelectedCourierFilter}
											/>
										</>
									)}
								</div>
							</div>
						</div>

						<div className="lg:col-span-3">
							{/****** Buddy With Exact Destination and Date ******/}
							<div className="flex justify-between items-center mb-4 max-sm:flex-col-reverse max-sm:gap-4">
								<p className="2xl:text-xl lg:text-base text-xs text-bob-tabs-text-color font-medium">
									{CONST.buddySearch.exactMatch}
								</p>

								{/*** Sort By Option ***/}
								<div className="flex flex-row items-center max-sm:self-baseline">
									<p className="2xl:text-xl md:text-base text-xs mr-2 text-bob-filters-placeholder-color w-full">
										{CONST.buddySearch.sortBy}
									</p>
									<SortByOption setSortBy={setSortBy} />
								</div>
							</div>

							<div className="space-y-4">
								{/****** Buddy List With Exact Destination and Date ******/}
								{loading ? (
									<ListingCardSkeleton />
								) : exactMatchListingData.length > 0 ? (
									exactMatchListingData.map((buddy) => (
										<BuddyListingCard buddyList={buddy} serviceType={serviceTypeValue} />
									))
								) : (
									<div className="flex justify-center text-2xl my-10 text-bob-form-label-color text-center">
										{CONST.buddySearch.noResultsFound}
									</div>
								)}

								{/******** Buddy With Same Destination Different Date ********/}
								<div className="2xl:text-xl lg:text-base text-xs text-bob-tabs-text-color font-medium my-5">
									{CONST.buddySearch.sameDestination}
								</div>

								{/******** Buddy List With Same Destination Different Date ********/}
								{loading ? (
									<ListingCardSkeleton />
								) : flexiMatchListingData.length > 0 ? (
									flexiMatchListingData.map((buddy) => (
										<BuddyListingCard buddyList={buddy} serviceType={serviceTypeValue} />
									))
								) : (
									<div className="flex justify-center text-2xl my-10 text-bob-form-label-color text-center">
										{CONST.buddySearch.sameDestinationNoResultsFound}
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					/********* To Show Buddy Profile Info *********/
					<BuddyListingInfo
						selectedBuddyInfo={selectedBuddyDetails}
						serviceType={serviceTypeValue}
					/>
				)}
			</div>
		</div>
	);
}
