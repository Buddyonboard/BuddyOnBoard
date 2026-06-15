import LandingContainer from '@/components/Landing/LandingContainer';
import {
	showErrorToast,
	showInfoToast,
	showSuccessToast,
	showWarningToast
} from '@/utils/toastUtils';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	getuserProfile,
	setUserProfile,
	getFirebaseUid,
	setUserProfileAfterSubmit,
	getVeriffStatus
} from '@/utils/localStorageHelper';
import API_URL from '../../environments/Environment-dev';

export default function LandingPage() {
	const [searchParams] = useSearchParams();
	const pollingToastShownRef = useRef(false);
	const firebaseUid = getFirebaseUid();

	useEffect(() => {
		const pendingStates = ['created', 'started', 'submitted', 'pending'];
		let intervalId;

		const initPolling = async () => {
			if (!firebaseUid) return;

			try {
				await setUserProfileAfterSubmit(API_URL, firebaseUid);
				const storedStatus = getVeriffStatus();
				if (!pendingStates.includes(storedStatus)) return;

				intervalId = setInterval(async () => {
					try {
						await setUserProfileAfterSubmit(API_URL, firebaseUid);
						const latestStatus = getVeriffStatus();
						console.log('Polling veriff status:', latestStatus);

						if (!pendingStates.includes(latestStatus)) {
							clearInterval(intervalId);

							if (!pollingToastShownRef.current) {
								const normalizedStatus = latestStatus?.toString().toLowerCase();
								if (normalizedStatus === 'success' || normalizedStatus === 'approved') {
									showSuccessToast('Verification completed successfully!');
								} else if (
									normalizedStatus === 'declined' ||
									normalizedStatus === 'rejected'
								) {
									showErrorToast('Verification failed. Please try again.');
								} else if (normalizedStatus === 'error') {
									showWarningToast(
										'Verification could not be completed. Please try again.'
									);
								} else {
									showInfoToast('Verification status updated.');
								}
								pollingToastShownRef.current = true;
							}

							setTimeout(() => {
								window.location.reload();
							}, 2000);
						}
					} catch (error) {
						console.log('Polling veriff status failed:', error);
					}
				}, 10000);
			} catch (error) {
				console.log('Start polling failed:', error);
			}
		};

		initPolling();

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [firebaseUid]);

	// This listens for veriffStatus in URL params to show appropriate toast messages and refresh localStorage profile data
	useEffect(() => {
		const veriffStatus = searchParams.get('veriffStatus');

		// Fetch user profile from DB and persist veriff status
		if (veriffStatus) {
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
	}, [searchParams, firebaseUid]);

	return (
		<>
			<LandingContainer />
		</>
	);
}
