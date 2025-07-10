const BuddyListing = require('../models/BuddyListingSchema');

exports.searchBuddyListings = async (req, res) => {
	try {
		const {
			serviceType,
			from,
			to,
			date,
			selectedPackageType,
			language,
			gender,
			sort
		} = req.query;

		if (!serviceType || !from || !to || !date) {
			return res.status(400).json({ message: 'Missing required parameters' });
		}

		const selectedDate = new Date(date);
		const dateMinus15 = new Date(selectedDate);
		dateMinus15.setDate(selectedDate.getDate() - 15);

		const datePlus15 = new Date(selectedDate);
		datePlus15.setDate(selectedDate.getDate() + 15);

		const listingArray =
			serviceType === 'Travel Buddy'
				? 'buddy_Listing_Details.travel_listing'
				: 'buddy_Listing_Details.courier_listing';

		// Build base match filter
		const baseMatch = {
			[`${listingArray}.listingStatus`]: 'active',
			[`${listingArray}.departureAirport`]: from,
			[`${listingArray}.arrivalAirport`]: to
		};

		// If serviceType is Courier Buddy AND selectedPackageType is provided, add courierPreferences match
		if (serviceType === 'Courier Buddy' && selectedPackageType) {
			baseMatch[`${listingArray}.courierPreferences`] = selectedPackageType;
		}

		// const languageMatch = language
		// 	? {
		// 			$or: [
		// 				{ [`${listingArray}.language1`]: language },
		// 				{ [`${listingArray}.language2`]: language },
		// 				{ [`${listingArray}.language3`]: language }
		// 			]
		// 	  }
		// 	: {};

		// const genderMatch = gender
		// 	? { [`${listingArray}.companionPreference`]: gender }
		// 	: {};

		// Aggregation
		const pipeline = [
			{ $unwind: `$${listingArray}` },
			{ $match: { ...baseMatch } },
			{
				$facet: {
					exactMatches: [
						{
							$match: {
								[`${listingArray}.departureDate`]: selectedDate.toISOString()
							}
						},
						{
							$project: {
								_id: 1,
								serviceProvider_user_Id: 1,
								serviceProviderDetails: 1,
								createdAt: 1,
								updatedAt: 1,
								// Keep only the listing type you searched for
								[`buddy_Listing_Details.${
									serviceType === 'Travel Buddy' ? 'travel_listing' : 'courier_listing'
								}`]: 1
							}
						}
						// { $sort: buildSortStage(sort, listingArray) }
					],
					flexibleDateMatches: [
						{
							$match: {
								[`${listingArray}.departureDate`]: {
									$gte: dateMinus15.toISOString(),
									$lte: datePlus15.toISOString(),
									$ne: selectedDate.toISOString()
								}
							}
						},
						{
							$project: {
								_id: 1,
								serviceProvider_user_Id: 1,
								serviceProviderDetails: 1,
								createdAt: 1,
								updatedAt: 1,
								// Keep only the listing type you searched for
								[`buddy_Listing_Details.${
									serviceType === 'Travel Buddy' ? 'travel_listing' : 'courier_listing'
								}`]: 1
							}
						}
						// { $sort: buildSortStage(sort, listingArray) }
					]
				}
			}
		];

		const result = await BuddyListing.aggregate(pipeline);

		res.json({
			success: true,
			data: result[0] // facet produces array with one result object
		});
	} catch (err) {
		console.error('Search error:', err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// Helper to build sort stage
// function buildSortStage(sort, listingArray) {
// 	if (sort === 'lowest_price') {
// 		return { [`${listingArray}.price1`]: 1 };
// 	} else if (sort === 'earliest_date') {
// 		return { [`${listingArray}.departureDate`]: 1 };
// 	} else {
// 		return {}; // Default relevance sort: let facet structure control
// 	}
// }
