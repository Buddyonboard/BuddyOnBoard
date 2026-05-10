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

		const normalizedStatus = veriffStatus?.toString().toLowerCase();
		let toastStatus = normalizedStatus;
		if (normalizedStatus === 'approved') toastStatus = 'success';
		if (normalizedStatus === 'declined') toastStatus = 'failed';
		if (normalizedStatus === 'rejected') toastStatus = 'failed';

		if (toastStatus === 'pending') {
			showInfoToast(
				'Verification submitted. You will be notified of the results shortly.'
			);
			window.history.replaceState({}, document.title, window.location.pathname);
		} else if (toastStatus === 'success') {
			showSuccessToast('Verification completed successfully!');
			window.history.replaceState({}, document.title, window.location.pathname);
		} else if (toastStatus === 'failed') {
			showErrorToast('Verification failed. Please try again.');
			window.history.replaceState({}, document.title, window.location.pathname);
		} else if (toastStatus === 'error') {
			showWarningToast('Verification could not be completed. Please try again.');
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	}, [searchParams]);

	return (
		<>
			<LandingContainer />
		</>
	);
}
