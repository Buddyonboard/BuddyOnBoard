const mongoose = require('mongoose');

const buddyListingSchema = new mongoose.Schema(
	{
		serviceProvider_user_Id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'service_provider',
			required: true
		},
		airline: { type: String, required: true },
		departureAirport: { type: String, required: true },
		departureDate: { type: Date, required: true },
		departureTime: { type: String, required: true },
		arrivalAirport: { type: String, required: true },
		arrivalDate: { type: Date, required: true },
		arrivalTime: { type: String, required: true },
		description: { type: String },

		travelAssitanceOptions: { type: String },
		companionPreference: { type: String },
		language1: { type: String },
		language2: { type: String },
		language3: { type: String },
		price1: { type: String },
		price2: { type: String },
		price3: { type: String },

		courierPreferences: { type: String },
		documentPrice1: { type: String },
		documentPrice2: { type: String },
		documentPrice3: { type: String },
		clothesPrice1: { type: String },
		clothesPrice2: { type: String },
		clothesPrice3: { type: String },
		electronicsPrice1: { type: String },
		electronicsPrice2: { type: String },
		electronicsPrice3: { type: String },
		acceptCourierTerms: { type: String },

		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	},
	{ collection: 'buddy_listings', strict: false }
);

const BuddyListing = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('buddyListingSchema', buddyListingSchema);

module.exports = BuddyListing;
