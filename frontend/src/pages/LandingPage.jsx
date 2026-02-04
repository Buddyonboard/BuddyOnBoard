import LandingContainer from '@/components/Landing/LandingContainer';
import {
	showErrorToast,
	showInfoToast,
	showSuccessToast,
	showWarningToast
} from '@/utils/toastUtils';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getuserProfile } from '@/utils/localStorageHelper';

export default function LandingPage() {
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const veriffStatus = searchParams.get('veriffStatus');

		// Persist veriff status into localStorage.userProfile so route guards can read it
		if (veriffStatus) {
			try {
				const raw = JSON.parse(localStorage.getItem('userProfile')) || {};
				const profile = raw.data || getuserProfile() || {};
				const updatedProfile = {
					...profile,
					veriff: { ...(profile.veriff || {}), status: veriffStatus }
				};
				raw.data = updatedProfile;
				localStorage.setItem('userProfile', JSON.stringify(raw));
			} catch (e) {
				showWarningToast('Failed to persist veriffStatus to localStorage');
				// console.log('Failed to persist veriffStatus to localStorage', e);
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
