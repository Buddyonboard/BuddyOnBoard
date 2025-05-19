const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
	{
		uid: { type: String, required: true, unique: true },
		firstName: String,
		middleName: String,
		lastName: String,
		dob: String,
		phoneNumber: { type: String, unique: true, sparse: true },
		country: String,
		email: { type: String, unique: true },
		role: {
			type: String,
			enum: ['serviceSeeker', 'serviceProvider'],
			default: 'serviceSeeker'
		},
		emailVerified: Boolean,
		privacyTerms: Boolean,
		profileCompleted: { type: Boolean, default: false },

		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	},
	{ collection: 'users', strict: false }
);

const Users = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('usersSchema', usersSchema);

module.exports = Users;
