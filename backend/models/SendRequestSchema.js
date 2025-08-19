const mongoose = require('mongoose');

const sendRequestSchema = new mongoose.Schema(
	{
		service_Seeker_Id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			required: true
		},
		buddy_requests: {
			travel_buddy_requests: [
				{
					serviceType: String,
					trip_details: mongoose.Schema.Types.Mixed,
					listingStatus: String,
					service_Provider_Details: mongoose.Schema.Types.Mixed,
					passengerCount: String,
					paymentStatus: {
						type: String
						// enum: ['pending', 'paid', 'failed']
						// default: 'pending'
					},
					paymentDetails: Object,
					passengers_List: [
						{
							age: String,
							gender: String
						}
					],
					totalAmount: mongoose.Schema.Types.Mixed,
					createdAt: Date,
					updatedAt: Date
				}
			],
			courier_buddy_requests: [
				{
					serviceType: String,
					trip_details: mongoose.Schema.Types.Mixed,
					listingStatus: String,
					service_Provider_Details: mongoose.Schema.Types.Mixed,
					totalItems: String,
					totalItemsWeight: String,
					paymentStatus: {
						type: String
						// enum: ['pending', 'paid', 'failed']
						// default: 'pending'
					},
					paymentDetails: Object,
					courier_Items_List: [
						{
							itemType: String,
							itemWeight: String,
							itemPicture: mongoose.Schema.Types.Mixed,
							itemDocument: mongoose.Schema.Types.Mixed,
							itemDescription: String
						}
					],
					totalAmount: mongoose.Schema.Types.Mixed,
					createdAt: Date,
					updatedAt: Date
				}
			],
			previous_requests: [
				{
					type: mongoose.Schema.Types.Mixed,
					default: []
				}
			]
		},

		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	},
	{ collection: 'buddy_requests', strict: false }
);

const BuddyRequestModal = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('sendRequestSchema', sendRequestSchema);

module.exports = BuddyRequestModal;
