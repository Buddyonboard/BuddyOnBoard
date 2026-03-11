import LandingContainer from '@/components/Landing/LandingContainer';
import {
	showErrorToast,
	showInfoToast,
	showSuccessToast,
	showWarningToast
} from '@/utils/toastUtils';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	getuserProfile,
	setUserProfile,
	getFirebaseUid,
	setUserProfileAfterSubmit
} from '@/utils/localStorageHelper';
import API_URL from '../../environments/Environment-dev';

export default function LandingPage() {
	const [searchParams] = useSearchParams();
	const firebaseUid = getFirebaseUid();

	// This fetches service provider data including veriff status and stores it in userProfile in localStorage
	useEffect(() => {
		const fetchVeriffStatus = async () => {
			try {
				// const firebaseUid = getFirebaseUid();
				if (firebaseUid) {
					await setUserProfileAfterSubmit(API_URL, firebaseUid);
				}
			} catch (error) {
				console.log('Failed to fetch veriff status:', error);
			}
		};

		fetchVeriffStatus();
	}, []);

	// This listens for veriffStatus in URL params to show appropriate toast messages and refresh localStorage profile data
	useEffect(() => {
		const veriffStatus = searchParams.get('veriffStatus');

		// Fetch user profile from DB and persist veriff status
		if (veriffStatus) {
			// const firebaseUid = getFirebaseUid();
			if (firebaseUid) {
				setUserProfileAfterSubmit(API_URL, firebaseUid, veriffStatus).catch((e) => {
					console.log('Failed to refresh profile with veriffStatus', e);
					showWarningToast('Failed to update verification status');
				});
			}
		}

		if (veriffStatus === 'pending') {
			// User completed Veriff flow, waiting for decision webhook
			showInfoToast(
				'Verification submitted. You will be notified of the results shortly.'
			);
			window.history.replaceState({}, document.title, window.location.pathname);
		} else if (veriffStatus === 'success') {
			// Show success toast
			showSuccessToast('Verification completed successfully!');
			// Optionally clear the param from URL
			window.history.replaceState({}, document.title, window.location.pathname);
		} else if (veriffStatus === 'failed') {
			// Show failure toast
			showErrorToast('Verification failed. Please try again.');
			window.history.replaceState({}, document.title, window.location.pathname);
		} else if (veriffStatus === 'error') {
			// Show error toast
			showWarningToast();
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	}, [searchParams]);

	return (
		<>
			<LandingContainer />
		</>
	);
}
