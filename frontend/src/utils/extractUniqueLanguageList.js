/*********** Get List of Languages based on the search results ************/
export function extractUniqueLanguages(results) {
	const allListings = [...results.exactMatches, ...results.flexibleDateMatches];

	const languages = new Set();

	allListings.forEach((item) => {
		const listing = item?.buddy_Listing_Details?.travel_listing;

		listing?.language1 && languages.add(listing.language1);
		listing?.language2 && languages.add(listing.language2);
		listing?.language3 && languages.add(listing.language3);
	});

	return Array.from(languages).filter((l) => l.trim() !== '');
}

/*********** Filter Buddy Results based on Language filter ************/
export function filterBasedOnLanguage(item, selectedLanguages) {
	const listing = item?.buddy_Listing_Details?.travel_listing;
	if (!listing) return false;

	const langs = [listing.language1, listing.language2, listing.language3];

	return selectedLanguages.some((lang) => langs.includes(lang));
}

/*********** Final Buddy Results based on Language and Gender filter ************/
export function filterBuddyListing(
	item,
	selectedLanguages,
	selectedGender,
	selectedCourierFilter
) {
	const travelListing = item?.buddy_Listing_Details?.travel_listing;
	const courierListing = item?.buddy_Listing_Details?.courier_listing;
	const listing = travelListing || courierListing;

	if (!listing) return false;

	// Gender match
	if (selectedGender && travelListing) {
		if (listing.companionPreference !== selectedGender) {
			return false;
		}
	}

	// Language match
	if (selectedLanguages.length > 0 && travelListing) {
		const hasLanguage = filterBasedOnLanguage(item, selectedLanguages);

		if (!hasLanguage) return false;
	}

	// Courier match
	if (
		selectedCourierFilter &&
		courierListing &&
		!listing.courierPreferences?.some((pref) =>
			pref.includes(selectedCourierFilter)
		)
	) {
		return false;
	}

	return true;
}

/****************** Sort Buddy Results Data *********************/
export function sortBuddyListings(list, sortBy) {
	const sorted = [...list];

	switch (sortBy) {
		case 'lowestprice':
			sorted.sort((a, b) => {
				const aPrice = getLowestPrice(a);
				const bPrice = getLowestPrice(b);
				return aPrice - bPrice;
			});
			break;

		case 'earliesttraveldate':
			sorted.sort((a, b) => {
				const aDate = new Date(getDepartureDate(a));
				const bDate = new Date(getDepartureDate(b));
				return aDate - bDate;
			});
			break;

		// Default is Relevance
		default:
			break;
	}

	return sorted;
}

// Helpers
function getLowestPrice(item) {
	const listing =
		item?.buddy_Listing_Details?.travel_listing ||
		item?.buddy_Listing_Details?.courier_listing;

	if (!listing) return Number.MAX_VALUE;

	const prices = [];

	// Add travel buddy prices if present
	if (item?.buddy_Listing_Details?.travel_listing) {
		prices.push(
			Number(listing?.price1 || Infinity),
			Number(listing?.price2 || Infinity),
			Number(listing?.price3 || Infinity)
		);
	}

	// Add courier buddy prices if present
	if (item?.buddy_Listing_Details?.courier_listing) {
		prices.push(
			Number(listing?.documentPrice1 || Infinity),
			Number(listing?.documentPrice2 || Infinity),
			Number(listing?.documentPrice3 || Infinity),
			Number(listing?.clothesPrice1 || Infinity),
			Number(listing?.clothesPrice2 || Infinity),
			Number(listing?.clothesPrice3 || Infinity),
			Number(listing?.electronicsPrice1 || Infinity),
			Number(listing?.electronicsPrice2 || Infinity),
			Number(listing?.electronicsPrice3 || Infinity)
		);
	}

	// Filter out Infinity (in case of missing fields)
	const validPrices = prices.filter((p) => p !== Infinity);

	// Return min price, or null if no valid price
	return validPrices.length ? Math.min(...validPrices) : null;
}

function getDepartureDate(item) {
	const listing =
		item?.buddy_Listing_Details?.travel_listing ||
		item?.buddy_Listing_Details?.courier_listing;

	return listing?.departureDate || '9999-12-31';
}
