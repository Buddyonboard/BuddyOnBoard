import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FirebaseRedirectHandler = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const mode = params.get('mode'); // e.g., "resetPassword", "verifyEmail"
		const oobCode = params.get('oobCode'); // Firebase action code
		const continueUrl = params.get('continueUrl'); // Your actual app's URL

		if (continueUrl) {
			// Redirect immediately to continue URL
			window.location.href = continueUrl;
		} else if (mode && oobCode) {
			// If no continueUrl, handle manually based on mode
			switch (mode) {
				case 'resetPassword':
					navigate(`/forgot-password?oobCode=${oobCode}`);
					break;
				default:
					navigate('/');
			}
		}
	}, []);

	return <div>Redirecting...</div>;
};

export default FirebaseRedirectHandler;
