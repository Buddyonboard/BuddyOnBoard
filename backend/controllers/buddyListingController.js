const { default: mongoose } = require('mongoose');
const BuddyListing = require('../models/BuddyListingSchema');
const serviceProvider = require('../models/ServiceProviderSchema');

/****************** Get Buddy Listings ********************/
exports.getBuddyListings = async (req, res) => {
	try {
		const { user_id } = req.params;

		const buddyListings = await BuddyListing.findOne(
			{ serviceProvider_user_Id: user_id },
			{
				_id: 1,
				buddy_Listing_Details: 1,
				serviceProviderDetails: 1,
				createdAt: 1,
				updatedAt: 1
			}
		);

		if (!buddyListings) {
			return res.status(404).json({
				message: 'No listings found for this service provider',
				data: null
			});
		}

		res.status(200).json({
			message: 'Listings retrieved successfully',
			data: buddyListings
		});
	} catch (err) {
		console.error('Error fetching buddy listings:', err);
		res
			.status(500)
			.json({ error: 'Internal server error', message: err.message });
	}
};

/********************* Create Buddy Listing **********************/
exports.buddyListingRegistration = async (req, res) => {
	try {
		const { user_id, serviceType, ...listingData } = req.body;

		const user = await serviceProvider.findOne({ user_Id: user_id });
		if (!user) {
			return res.status(404).json({ message: 'Service provider not found' });
		}

		const updateField =
			serviceType === 'Courier Buddy'
				? 'buddy_Listing_Details.courier_listing'
				: serviceType === 'Travel Buddy'
				? 'buddy_Listing_Details.travel_listing'
				: null;

		if (!updateField) {
			return res.status(400).json({ message: 'Invalid service type' });
		}

		/* Generate Unique Id for each listing */
		const generatedListingId = new mongoose.Types.ObjectId();

		// Push new listing into appropriate array
		const submittedForm = await BuddyListing.findOneAndUpdate(
			{ serviceProvider_user_Id: user_id },
			{
				$setOnInsert: {
					serviceProvider_user_Id: user_id,
					serviceProviderDetails: user
				},
				$push: {
					[updateField]: {
						listing_id: generatedListingId,
						serviceType,
						...listingData,
						createdAt: new Date(),
						updatedAt: new Date()
					}
				}
			},
			{ upsert: true, new: true }
		);

		res
			.status(200)
			.json({ message: 'Listing added successfully', data: submittedForm });
	} catch (err) {
		console.error('Error saving buddy listing:', err);
		res
			.status(500)
			.json({ error: 'Internal server error', message: err.message });
	}
};

/*********************** Edit Buddy Listing *************************/
exports.editBuddyListing = async (req, res) => {
	try {
		const { user_id, serviceType, listing_id, ...updatedData } = req.body;

		const arrayField =
			serviceType === 'Courier Buddy'
				? 'buddy_Listing_Details.courier_listing'
				: serviceType === 'Travel Buddy'
				? 'buddy_Listing_Details.travel_listing'
				: null;

		if (!arrayField) {
			return res.status(400).json({ message: 'Invalid service type' });
		}

		const listingObjectId = new mongoose.Types.ObjectId(listing_id);

		const updatedDoc = await BuddyListing.findOneAndUpdate(
			{
				serviceProvider_user_Id: user_id,
				[`${arrayField}.listing_id`]: listingObjectId
			},
			{
				$set: {
					[`${arrayField}.$`]: {
						...updatedData,
						serviceType: serviceType, // preserve serviceType
						listing_id: listingObjectId, // preserve listing_id
						updatedAt: new Date()
					}
				}
			},
			{ new: true }
		);

		if (!updatedDoc) {
			return res.status(404).json({ message: 'Listing not found' });
		}

		res
			.status(200)
			.json({ message: 'Listing updated successfully', data: updatedDoc });
	} catch (err) {
		console.error('Error updating listing:', err);
		res
			.status(500)
			.json({ error: 'Internal server error', message: err.message });
	}
};

/******************* Delete Buddy Listing ********************/
exports.deleteBuddyListing = async (req, res) => {
	try {
		const { user_id, serviceType, listing_id } = req.body;

		/******** Pull the listing from active array ********/
		const update = {
			$pull: {
				[`buddy_Listing_Details.${
					serviceType === 'Courier Buddy' ? 'courier_listing' : 'travel_listing'
				}`]: {
					listing_id: new mongoose.Types.ObjectId(listing_id)
				}
			}
		};

		/******** Also push into previous listings array ********/
		const listingDoc = await BuddyListing.findOne({
			serviceProvider_user_Id: user_id
		});

		if (!listingDoc) {
			return res.status(404).json({ message: 'Listing not found' });
		}

		let deletedListing;
		if (serviceType === 'Courier Buddy') {
			deletedListing = listingDoc.buddy_Listing_Details.courier_listing.find(
				(l) => l.listing_id.toString() === listing_id
			);
		} else {
			deletedListing = listingDoc.buddy_Listing_Details.travel_listing.find(
				(l) => l.listing_id.toString() === listing_id
			);
		}

		if (!deletedListing) {
			return res
				.status(404)
				.json({ message: 'Listing not found in active listings' });
		}

		/* Update listingStatus to "deleted" */
		deletedListing.listingStatus = 'deleted';

		update.$push = {
			'buddy_Listing_Details.previous_listings': deletedListing
		};

		/******** Perform update ********/
		const updatedDoc = await BuddyListing.findOneAndUpdate(
			{ serviceProvider_user_Id: user_id },
			update,
			{ new: true }
		);

		res
			.status(200)
			.json({ message: 'Listing deleted successfully', data: updatedDoc });
	} catch (err) {
		console.error('Error deleting listing:', err);
		res
			.status(500)
			.json({ error: 'Internal server error', message: err.message });
	}
};
