const BuddyListing = require('../models/BuddyListingSchema');
const serviceProvider = require('../models/ServiceProviderSchema');

/*** Create Buddy Listing ***/
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
			.json({ message: 'Listing added successfully', submittedForm });
	} catch (err) {
		console.error('Error saving buddy listing:', err);
		res
			.status(500)
			.json({ error: 'Internal server error', message: err.message });
	}
};

/*** Edit Buddy Listing ***/
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

		const updatedDoc = await BuddyListing.findOneAndUpdate(
			{
				serviceProvider_user_Id: user_id,
				[`${arrayField}._id`]: listing_id
			},
			{
				$set: {
					[`${arrayField}.$`]: {
						...updatedData,
						_id: listing_id, // preserve id
						updatedAt: new Date()
					}
				}
			},
			{ new: true }
		);

		if (!updatedDoc) {
			return res.status(404).json({ message: 'Listing not found' });
		}

		res.status(200).json({ message: 'Listing updated successfully', updatedDoc });
	} catch (err) {
		console.error('Error updating listing:', err);
		res
			.status(500)
			.json({ error: 'Internal server error', message: err.message });
	}
};

/*** Delete Buddy Listing ***/
exports.deleteBuddyListing = async (req, res) => {
	try {
		const { user_id, serviceType, listing_id } = req.body;

		const arrayField =
			serviceType === 'Courier Buddy'
				? 'buddy_Listing_Details.courier_listing'
				: serviceType === 'Travel Buddy'
				? 'buddy_Listing_Details.travel_listing'
				: null;

		if (!arrayField) {
			return res.status(400).json({ message: 'Invalid service type' });
		}

		const updatedDoc = await BuddyListing.findOneAndUpdate(
			{ serviceProvider_user_Id: user_id },
			{
				$pull: {
					[arrayField]: { _id: listing_id }
				}
			},
			{ new: true }
		);

		res.status(200).json({ message: 'Listing deleted successfully', updatedDoc });
	} catch (err) {
		console.error('Error deleting listing:', err);
		res
			.status(500)
			.json({ error: 'Internal server error', message: err.message });
	}
};
