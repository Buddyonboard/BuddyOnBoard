const mongoose = require('mongoose');

const serviceRequestFormSchema = new mongoose.Schema(
	{
		fullName: String,
		email: String,
		uploadAttachment: String,
		yourMessage: String,
		requestCallBack: Boolean,
		phoneNumber: String,

		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	},
	{ collection: 'service_Requests', strict: false }
);

const ServiceRequests = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('serviceRequestFormSchema', serviceRequestFormSchema);

module.exports = ServiceRequests;
