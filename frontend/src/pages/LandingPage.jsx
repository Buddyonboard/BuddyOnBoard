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
	const [currentVeriffStatus, setCurrentVeriffStatus] =
		useState(getVeriffStatus());
	const pollingToastShownRef = useRef(false);
	const pendingToastShownRef = useRef(false);
	const pollingIntervalRef = useRef(null);
	const pollingActiveRef = useRef(false);
	const firebaseUid = getFirebaseUid();
	const pendingStates = ['created', 'started', 'submitted', 'pending'];

	const startPolling = async () => {
		if (!firebaseUid || pollingActiveRef.current) return;

		const storedStatus = getVeriffStatus();
		if (!pendingStates.includes(storedStatus)) return;

		pollingActiveRef.current = true;
		pollingIntervalRef.current = setInterval(async () => {
			try {
				await setUserProfileAfterSubmit(API_URL, firebaseUid);
				const latestStatus = getVeriffStatus();
				console.log('Polling veriff status:', latestStatus);
				setCurrentVeriffStatus(latestStatus);

				if (!pendingStates.includes(latestStatus)) {
					clearInterval(pollingIntervalRef.current);
					pollingIntervalRef.current = null;
					pollingActiveRef.current = false;
				}
			} catch (error) {
				console.log('Polling veriff status failed:', error);
			}
		}, 10000);
	};

	const stopPolling = () => {
		if (pollingIntervalRef.current) {
			clearInterval(pollingIntervalRef.current);
			pollingIntervalRef.current = null;
		}
		pollingActiveRef.current = false;
	};

	useEffect(() => {
		const init = async () => {
			if (!firebaseUid) return;

			try {
				await setUserProfileAfterSubmit(API_URL, firebaseUid);
				const storedStatus = getVeriffStatus();
				setCurrentVeriffStatus(storedStatus);
				if (pendingStates.includes(storedStatus)) {
					startPolling();
				}
			} catch (error) {
				console.log('Start polling failed:', error);
			}
		};

		init();

		return () => {
			stopPolling();
		};
	}, [firebaseUid]);

	useEffect(() => {
		const normalizedStatus = currentVeriffStatus?.toString().toLowerCase();
		if (!normalizedStatus) return;

		if (pendingStates.includes(normalizedStatus)) {
			if (!pendingToastShownRef.current) {
				showInfoToast(
					'Verification submitted. You will be notified of the results shortly.'
				);
				pendingToastShownRef.current = true;
			}
			startPolling();
			return;
		}

		if (!pollingToastShownRef.current) {
			if (normalizedStatus === 'success' || normalizedStatus === 'approved') {
				showSuccessToast('Verification completed successfully!');
			} else if (
				normalizedStatus === 'declined' ||
				normalizedStatus === 'rejected'
			) {
				showErrorToast('Verification failed. Please try again.');
			} else if (normalizedStatus === 'error') {
				showWarningToast('Verification could not be completed. Please try again.');
			} else {
				showInfoToast('Verification status updated.');
			}
			pollingToastShownRef.current = true;
		}

		if (!pendingStates.includes(normalizedStatus)) {
			stopPolling();
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}
	}, [currentVeriffStatus]);

	// This listens for veriffStatus in URL params to show appropriate toast messages and refresh localStorage profile data
	useEffect(() => {
		const run = async () => {
			const veriffStatus = searchParams.get('veriffStatus');

			if (!veriffStatus) return;

			if (firebaseUid) {
				try {
					await setUserProfileAfterSubmit(API_URL, firebaseUid, veriffStatus);
					const latestStatus = getVeriffStatus();
					setCurrentVeriffStatus(latestStatus);
				} catch (e) {
					console.log('Failed to refresh profile with veriffStatus', e);
					showWarningToast('Failed to update verification status');
				}
			}

			const normalizedStatus = veriffStatus?.toString().toLowerCase();
			let toastStatus = normalizedStatus;
			if (normalizedStatus === 'approved') toastStatus = 'success';
			if (normalizedStatus === 'declined') toastStatus = 'failed';
			if (normalizedStatus === 'rejected') toastStatus = 'failed';

			if (toastStatus === 'pending') {
				if (!pendingToastShownRef.current) {
					showInfoToast(
						'Verification submitted. You will be notified of the results shortly.'
					);
					pendingToastShownRef.current = true;
				}
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
		};

		run();
	}, [searchParams, firebaseUid]);

	return (
		<>
			<LandingContainer />
		</>
	);
}
