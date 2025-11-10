const mongoose = require('mongoose');

const VeriffSchema = new mongoose.Schema({
	sessionId: { type: String, default: null },
	sessionUrl: { type: String, default: null },
	sessionToken: { type: String, default: null }, // optional
	status: { type: String, default: 'not_started' }, // not_started | created | started | submitted | approved | declined | resubmission_requested | expired | abandoned | review
	decision: { type: String, default: null }, // approved/declined/review/etc
	reasonCode: { type: String, default: null },
	reason: { type: String, default: null },
	verifiedAt: { type: Date, default: null },
	rawWebhookPayload: { type: Object, default: null },
	lastUpdated: { type: Date, default: Date.now }
});

const serviceProviderSchema = new mongoose.Schema(
	{
		user_Id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			required: true
		},
		isVerified: { type: Boolean, default: false },
		// verificationID: String,
		veriff: { type: VeriffSchema, default: () => ({}) },
		stripeConnectedAccountId: String,
		stripeConnectedAccountStatus: String,

		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	},
	{ collection: 'service_provider', strict: false }
);

const serviceProvider = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('serviceProviderSchema', serviceProviderSchema);

module.exports = serviceProvider;
