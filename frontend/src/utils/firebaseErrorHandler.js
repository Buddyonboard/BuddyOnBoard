import CONST from '@/utils/Constants';

const firebaseErrorMessages = {
	// Auth errors
	'auth/email-already-in-use': CONST.LANDING[0].userAlreadyRegistered,
	'auth/invalid-credential': CONST.LANDING[0].wrongPasswordUsername,
	// 'auth/invalid-email': 'The email address is not valid.',
	// 'auth/user-disabled': 'This user has been disabled.',
	// 'auth/user-not-found': 'No user found with this email.',
	// 'auth/wrong-password': 'Incorrect password. Please try again.',
	// 'auth/weak-password': 'Password should be at least 6 characters.',

	// Provider errors
	'auth/account-exists-with-different-credential': CONST.emailAlreadyLinked,
	// 'auth/popup-blocked':
	// 	'Popup blocked by browser. Please allow popups and try again.',
	// 'auth/popup-closed-by-user': 'Popup closed before completing the sign-in.',
	// 'auth/operation-not-supported-in-this-environment':
	// 	'This operation is not supported in the current environment.',

	// Network
	'auth/network-request-failed': CONST.networkError,

	// Phone
	// 'auth/invalid-phone-number': 'Invalid phone number format.',
	// 'auth/missing-verification-code': 'Verification code is missing.',
	// 'auth/code-expired': 'Verification code has expired. Please try again.',

	// Custom token
	// 'auth/invalid-custom-token': 'Invalid custom token.',
	// 'auth/custom-token-mismatch':
	// 	'Custom token belongs to a different Firebase project.',

	// Fallback
	default: CONST.somethingWentWrong
};

// This function maps error codes to messages
export function getFirebaseErrorMessage(errorCode) {
	return firebaseErrorMessages[errorCode] || firebaseErrorMessages.default;
}
