import LandingContainer from '@/components/Landing/LandingContainer';
import {
	showErrorToast,
	showSuccessToast,
	showWarningToast
} from '@/utils/toastUtils';
import { useSearchParams } from 'react-router-dom';

export default function LandingPage() {
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const veriffStatus = searchParams.get('veriffStatus');

		if (veriffStatus === 'success') {
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
