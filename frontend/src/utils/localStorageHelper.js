import axios from 'axios';

export function getUserDetails() {
	const storedUser = localStorage.getItem('user');

	if (!storedUser) return null;

	try {
		return JSON.parse(storedUser);
	} catch (error) {
		console.error('Error parsing user details from localStorage:', error);
		return null;
	}
}

export function getTokenDetails() {
	const userDetails = getUserDetails();

	if (!userDetails || !userDetails.stsTokenManager) {
		return null; // Return null if the token structure is missing
	}

	return userDetails.stsTokenManager.accessToken;
}

/***** Retrieve Firebase user ID from localStorage *****/
export function getFirebaseUid() {
	const userDetails = getUserDetails();
	return userDetails?.uid || null;
}

/***** Retrieve userProfile data from LocalStorage ****/
export function getuserProfile() {
	const userProfile = JSON.parse(localStorage.getItem('userProfile'))?.data;
	return userProfile;
}

/***** Set userProfile data Immediately After Submit in LocalStorage ****/
export async function setUserProfile(apiUrl, userUid, veriffStatus = null) {
	const res = await axios.get(`${apiUrl}/users/${userUid}`);
	// Ensure we have an object to store
	const payload = res.data || {};
	// If caller provided a veriffStatus, persist it into the stored profile
	try {
		payload.data = payload.data || payload;
		payload.data.veriff = payload.data.veriff || {};
		if (veriffStatus) payload.data.veriff.status = veriffStatus;
	} catch (e) {
		// If shaping fails, just ignore and store original response
		console.warn('Could not attach veriffStatus to profile', e);
	}
	localStorage.setItem('userProfile', JSON.stringify(payload));
	return res;
}

/* DO NOT DELETE */
/* export async function setUserProfile(apiUrl, userUid) {
	const res = await axios.get(`${apiUrl}/users/${userUid}`);
	localStorage.setItem('userProfile', JSON.stringify(res.data));
	return res;
} */

/***** Retrieve userProfile _id data from LocalStorage ****/
export function getSeekerId() {
	const seekerId = getuserProfile()?._id;
	return seekerId;
}
