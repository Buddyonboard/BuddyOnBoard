const Users = require('../models/UsersSchema');
const admin = require('../Config/firebase');

/****** User Profile Registration/Update Controller ******/
exports.userRegistration = async (req, res) => {
	try {
		const {
			idToken,
			firstName,
			middleName,
			lastName,
			dateOfBirth,
			phoneNumber,
			countryOfResidence,
			role,
			privacyTerms,
			profileCompleted,
			emailVerified
		} = req.body;

		/****** Verify token *****/
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		const { uid, email } = decodedToken;

		const updateData = {
			uid,
			firstName,
			middleName,
			lastName,
			dateOfBirth,
			// phoneNumber,
			countryOfResidence,
			email,
			role,
			emailVerified,
			privacyTerms,
			profileCompleted,
			updatedAt: new Date()
		};

		const updateUnset = {};

		/****** Handle phoneNumber logic explicitly ******/
		if (typeof phoneNumber !== 'undefined') {
			if (phoneNumber && phoneNumber !== '') {
				updateData.phoneNumber = phoneNumber;
			} else {
				updateUnset.phoneNumber = ''; // Unset the field in MongoDB
			}
		}

		/****** Save user to MongoDB using $set and $unset ******/
		const updatedPayload = {};
		if (Object.keys(updateData).length > 0) updatedPayload.$set = updateData;
		if (Object.keys(updateUnset).length > 0) updatedPayload.$unset = updateUnset;

		/****** Save full user record to MongoDB *****/
		const user = await Users.findOneAndUpdate(
			{ uid },
			// { $set: updateData },
			updatedPayload,
			{ upsert: true, new: true }
		);

		res.status(200).json({ message: 'User saved', user });
	} catch (err) {
		console.error('Error saving user:', err);
		res.status(401).json({ error: 'Unauthorized', message: err.codeName });
	}
};

/****** Find User Profile based on uId ******/
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
