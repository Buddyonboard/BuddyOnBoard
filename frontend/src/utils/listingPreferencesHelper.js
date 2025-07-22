/************** Returns the appropriate listing based on the service type **************/
export function getListingByServiceType(buddyList = {}, serviceType = '') {
	const travelListing = buddyList?.buddy_Listing_Details?.travel_listing;
	const courierListing = buddyList?.buddy_Listing_Details?.courier_listing;

	return serviceType === 'Travel Buddy' ? travelListing : courierListing;
}

/*********** Returns a cleaned list of preferences based on the service type *********/
export function getPreferencesList(listingType = {}, serviceType = '') {
	if (serviceType === 'Travel Buddy') {
		const languagesList = [
			listingType?.language1,
			listingType?.language2,
			listingType?.language3
		].filter((lang) => lang !== undefined && lang !== null && lang !== '');

		return languagesList;
	} else {
		const courierItemsList = Array.from(
			new Set(
				(listingType?.courierPreferences || []).map((item) => {
					if (item?.toLowerCase().startsWith('electronics')) {
						return 'Electronics';
					}
					return item;
				})
			)
		);

		return courierItemsList;
	}
}

/********* Extracts the lowest starting price from a listing based on service type ************/
export function getStartingPrice(listingType = {}, serviceType = '') {
	const prices = [];

	if (serviceType === 'Travel Buddy') {
		prices.push(
			Number(listingType?.price1 || Infinity),
			Number(listingType?.price2 || Infinity),
			Number(listingType?.price3 || Infinity)
		);
	}

	if (serviceType === 'Courier Buddy') {
		const courierFields = [
			'documentPrice1',
			'documentPrice2',
			'documentPrice3',
			'clothesPrice1',
			'clothesPrice2',
			'clothesPrice3',
			'electronicsPrice1',
			'electronicsPrice2',
			'electronicsPrice3'
		];

		courierFields.forEach((field) => {
			prices.push(Number(listingType?.[field] || Infinity));
		});
	}

	const validPrices = prices.filter((p) => p !== Infinity);

	return validPrices.length ? Math.min(...validPrices) : null;
}

/************ Returns the lowest price for each courier item type **************/
export function getMinPricesForCourierItems(listingType = {}) {
	const itemTypes = ['document', 'clothes', 'electronics'];
	const result = {};

	itemTypes.forEach((type) => {
		const prices = [1, 2, 3].map((i) =>
			Number(listingType?.[`${type}Price${i}`] || Infinity)
		);

		const validPrices = prices.filter((p) => p !== Infinity);

		result[type] = validPrices.length ? Math.min(...validPrices) : null;
	});

	return result;
}

/********* Calculates the buddy price based on service type and provided inputs ********/
export function getBuddyPrice(
	buddyDetails = {},
	passengerCount = 1,
	items = [],
	buddyRequestDetails = {},
	serviceType
) {
	const travelListing =
		buddyDetails?.buddy_Listing_Details?.travel_listing ||
		buddyRequestDetails?.trip_details;
	const courierListing =
		buddyDetails?.buddy_Listing_Details?.courier_listing ||
		buddyRequestDetails?.trip_details;

	const weightPricingMap = {
		Documents: [
			{ max: 500, key: 'documentPrice1' },
			{ max: 1000, key: 'documentPrice2' },
			{ max: Infinity, key: 'documentPrice3' }
		],
		Clothes: [
			{ max: 1000, key: 'clothesPrice1' },
			{ max: 3000, key: 'clothesPrice2' },
			{ max: Infinity, key: 'clothesPrice3' }
		],
		Electronics: [
			{ max: 1000, key: 'electronicsPrice1' },
			{ max: 3000, key: 'electronicsPrice2' },
			{ max: Infinity, key: 'electronicsPrice3' }
		]
	};

	if (travelListing && serviceType === 'Travel Buddy') {
		switch (passengerCount) {
			case 1:
				return Number(travelListing?.price1 || 0);
			case 2:
				return Number(travelListing?.price2 || 0);
			case 3:
				return Number(travelListing?.price3 || 0);
			default:
				return 0;
		}
	} else if (courierListing && serviceType === 'Courier Buddy') {
		let total = 0;

		items.forEach(({ itemType, weight }) => {
			if (!itemType || !weight) return;

			const itemTypeNormalized = itemType
				.toLowerCase()
				.startsWith('electronics open-box')
				? 'Electronics'
				: itemType;

			const weightNum = Number(weight);
			const category = weightPricingMap[itemTypeNormalized];

			if (!category) return;

			const matched = category.find((rule) => weightNum <= rule.max);
			if (matched) {
				const priceKey = matched.key;
				total += Number(courierListing[priceKey] || 0);
			}
		});

		return total;
	}

	return 0;
}
