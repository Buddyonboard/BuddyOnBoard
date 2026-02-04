import LandingContainer from '@/components/Landing/LandingContainer';
import {
	showErrorToast,
	showInfoToast,
	showSuccessToast,
	showWarningToast
} from '@/utils/toastUtils';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getuserProfile, setUserProfile } from '@/utils/localStorageHelper';
import API_URL from '../../environments/Environment-dev';

export default function LandingPage() {
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const veriffStatus = searchParams.get('veriffStatus');

		// Fetch user profile from DB and persist veriff status
		if (veriffStatus) {
			const uid = getuserProfile()?._id;
			if (uid) {
				setUserProfile(API_URL, uid, veriffStatus).catch((e) => {
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
