const mongoose = require('mongoose');

const reportIssueFormSchema = new mongoose.Schema(
	{
		fullName: String,
		email: String,
		uploadAttachment: String,
		message: String,
		requestCallBack: Boolean,
		phoneNumber: String,
		anonymousTerms: Boolean,

		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	},
	{ collection: 'report_issue', strict: false }
);

const ReportIssue = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('reportIssueFormSchema', reportIssueFormSchema);

module.exports = ReportIssue;
