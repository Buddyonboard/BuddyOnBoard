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
	const pollingIntervalRef = useRef(null);
	const pollingActiveRef = useRef(false);
	const prevVeriffStatusRef = useRef(getVeriffStatus());
	const firebaseUid = getFirebaseUid();
	const pendingStates = ['created', 'started', 'submitted', 'pending'];
	const toastShownKey = 'veriffToastShownStatus';
	const pendingToastShownKey = 'veriffPendingToastShown';

	const normalize = (status) => status?.toString().toLowerCase();

	const clearToastKeys = () => {
		localStorage.removeItem(toastShownKey);
		localStorage.removeItem(pendingToastShownKey);
		pollingActiveRef.current = false;
	};

	const showPendingToastOnce = () => {
		const storedStatus = localStorage.getItem(toastShownKey);
		const currentStatus = normalize(currentVeriffStatus);
		if (pendingStates.includes(currentStatus)) {
			localStorage.removeItem(toastShownKey);
			localStorage.removeItem(pendingToastShownKey);
		}
		if (localStorage.getItem(pendingToastShownKey) === 'true') return;
		showInfoToast(
			'Verification submitted. You will be notified of the results shortly.'
		);
		localStorage.setItem(pendingToastShownKey, 'true');
	};

	const showTerminalToastOnce = (normalizedStatus) => {
		const shownStatus = localStorage.getItem(toastShownKey);
		if (shownStatus === normalizedStatus) return;

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

		localStorage.setItem(toastShownKey, normalizedStatus);
	};

	const refreshStatus = async () => {
		if (!firebaseUid) return;
		await setUserProfileAfterSubmit(API_URL, firebaseUid);
		const storedStatus = getVeriffStatus();
		setCurrentVeriffStatus(storedStatus);
		return storedStatus;
	};

	const startPolling = () => {
		if (pollingActiveRef.current) return;
		pollingActiveRef.current = true;
		pollingIntervalRef.current = setInterval(async () => {
			try {
				const latestStatus = await refreshStatus();
				if (!pendingStates.includes(normalize(latestStatus))) {
					stopPolling();
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
				const status = await refreshStatus();
				if (pendingStates.includes(normalize(status))) {
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
		const normalizedStatus = normalize(currentVeriffStatus);
		if (!normalizedStatus) return;

		if (pendingStates.includes(normalizedStatus)) {
			showPendingToastOnce();
			startPolling();
			return;
		}

		const previousStatus = normalize(prevVeriffStatusRef.current);
		const isNewTerminal = previousStatus !== normalizedStatus;
		if (isNewTerminal) {
			showTerminalToastOnce(normalizedStatus);
		}

		stopPolling();
		prevVeriffStatusRef.current = currentVeriffStatus;
	}, [currentVeriffStatus]);

	useEffect(() => {
		const run = async () => {
			const veriffStatus = searchParams.get('veriffStatus');
			if (!veriffStatus) return;

			// Clear previous toast markers so this is treated as a fresh attempt
			clearToastKeys();

			// Show "submitted" immediately for every verification attempt
			showPendingToastOnce();

			if (firebaseUid) {
				try {
					await setUserProfileAfterSubmit(API_URL, firebaseUid, veriffStatus);
					const latest = await refreshStatus();
					const norm = normalize(latest);
					if (!pendingStates.includes(norm)) {
						// If decision already available, show it once
						showTerminalToastOnce(norm);
					}
				} catch (e) {
					console.log('Failed to refresh profile with veriffStatus', e);
					showWarningToast('Failed to update verification status');
				}
			}

			window.history.replaceState({}, document.title, window.location.pathname);
		};

		run();
	}, [searchParams, firebaseUid]);

	return (
		<>
			<LandingContainer />
		</>
	);
}
