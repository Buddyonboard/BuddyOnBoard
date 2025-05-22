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

/***** Retrieve userProfile data from LocalStorage ****/
export function getuserProfile() {
	const userProfile = JSON.parse(localStorage.getItem('userProfile'))?.data;
	return userProfile;
}

/***** Set userProfile data Immediately After Submit in LocalStorage ****/
export async function setUserProfile(apiUrl, userUid) {
	const res = await axios.get(`${apiUrl}/users/${userUid}`);
	localStorage.setItem('userProfile', JSON.stringify(res.data));
	return res;
}
