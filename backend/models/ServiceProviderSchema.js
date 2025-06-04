const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema(
	{
		user_Id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			required: true
		},
		isVerified: { type: Boolean, default: false },
		verificationID: String,

		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	},
	{ collection: 'service_provider', strict: false }
);

const serviceProvider = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('serviceProviderSchema', serviceProviderSchema);

module.exports = serviceProvider;
