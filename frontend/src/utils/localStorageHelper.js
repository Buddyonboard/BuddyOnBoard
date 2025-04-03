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
