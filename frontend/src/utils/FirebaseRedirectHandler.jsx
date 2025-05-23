import { useFirebase } from '@/context/Firebase-Context';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CONST from './Constants';
import API_URL from '../../environments/Environment-dev';
import { setUserProfile } from './localStorageHelper';
import axios from 'axios';

const FirebaseRedirectHandler = () => {
	const navigate = useNavigate();
	const firebase = useFirebase();
	const hasHandled = useRef(false); // Prevent multiple executions

	useEffect(() => {
		if (hasHandled.current) return;

		const params = new URLSearchParams(window.location.search);
		const mode = params.get('mode'); // e.g., "resetPassword", "verifyEmail"
		const oobCode = params.get('oobCode'); // Firebase action code
		const continueUrl = params.get('continueUrl'); // Your actual app's URL

		const handleRedirect = async () => {
			if (!mode || !oobCode) {
				toast.warning('Invalid Link', {
					position: 'top-right',
					closeButton: true,
					style: { backgroundColor: 'red' }
				});
				return;
			}

			hasHandled.current = true; // Mark as handled

			try {
				switch (mode) {
					case 'verifyEmail':
						await firebase.VerifyEmail(oobCode);
						const userData = {
							idToken: await firebase.firebaseAuth.currentUser.getIdToken(),
							emailVerified: true
						};
						/**** Send ID token + user profile data to backend ****/
						await axios.post(`${API_URL}/user-registration`, userData);

						/***** Set User Profile in Localstorage ****/
						await setUserProfile(API_URL, firebase.firebaseAuth.currentUser.uid);

						toast.success(CONST.emailVerified, {
							position: 'top-right',
							closeButton: true,
							style: { backgroundColor: 'green' }
						});
						setTimeout(() => {
							if (continueUrl) {
								window.location.href = continueUrl;
							}
						}, 1200);
						break;

					case 'resetPassword':
						navigate(`/forgot-password?oobCode=${oobCode}`);
						break;

					default:
						navigate('/');
				}
			} catch (err) {
				if (err?.code === 'auth/invalid-action-code') {
					toast.warning(CONST.emailVerificationLinkInvalid, {
						position: 'top-right',
						closeButton: true,
						style: { backgroundColor: 'red' }
					});
				} else {
					toast.warning(CONST.somethingWentWrong, {
						position: 'top-right',
						closeButton: true,
						style: { backgroundColor: 'red' }
					});
				}
				navigate('/');
				// console.log('Error >', err);
			}
		};

		handleRedirect();
	}, [navigate]);

	return <div className="text-center">Redirecting...Please Wait</div>;
};

export default FirebaseRedirectHandler;
