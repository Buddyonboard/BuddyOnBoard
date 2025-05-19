const Users = require('../models/UsersSchema');
const admin = require('../Config/firebase');

exports.userRegistration = async (req, res) => {
	try {
		const {
			idToken,
			firstName,
			middleName,
			lastName,
			dob,
			phoneNumber,
			country,
			role,
			privacyTerms,
			profileCompleted
		} = req.body;

		/****** 1. Verify token *****/
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		const { uid, email, email_verified } = decodedToken;

		/****** 2. Save full user record to MongoDB *****/
		const user = await Users.findOneAndUpdate(
			{ uid },
			{
				uid,
				firstName,
				middleName,
				lastName,
				dob,
				phoneNumber,
				country,
				email,
				role,
				email_verified,
				privacyTerms,
				profileCompleted,
				updatedAt: new Date()
			},
			{ upsert: true, new: true }
		);

		res.status(200).json({ message: 'User saved', user });
	} catch (err) {
		console.error('Error saving user:', err);
		res.status(401).json({ error: 'Unauthorized' });
	}
};

exports.findUserData = async (req, res) => {
	try {
		const { userUid } = req.params;

		const user = await Users.findOne({ uid: userUid });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({ data: user });
	} catch (err) {
		console.error('Error fetching user:', err);
		res.status(500).json({ message: 'Server error' });
	}
};
