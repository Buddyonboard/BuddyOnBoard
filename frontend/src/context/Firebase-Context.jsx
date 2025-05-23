import { createContext, useContext, useEffect, useState } from 'react';
import { app } from '@/config/firebase';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	sendPasswordResetEmail,
	verifyPasswordResetCode,
	confirmPasswordReset,
	sendEmailVerification,
	getAdditionalUserInfo,
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
	applyActionCode
} from 'firebase/auth';
import { toast } from 'sonner';
import CONST from '@/utils/Constants';
import API_URL from '../../environments/Environment-dev';
import axios from 'axios';
import { setUserProfile } from '@/utils/localStorageHelper';

const FirebaseContext = createContext();

const firebaseAuth = getAuth(app);

/*** Custom Firebase Hook ***/
export const useFirebase = () => useContext(FirebaseContext);

export default function FirebaseProvider(props) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		function unSubscribe() {
			onAuthStateChanged(firebaseAuth, async (user) => {
				if (user) {
					try {
						setUser(user);
						localStorage.setItem('user', JSON.stringify(user));
						const userUid = user.uid;
						const res = await setUserProfile(API_URL, userUid);

						if (res.status === 200) {
							localStorage.setItem('userProfile', JSON.stringify(res.data));
						}
					} catch (error) {
						if (error.status === 404) {
							toast('Please Complete User Registration', {
								position: 'top-right',
								closeButton: true
							});
						}
						// console.log('Failed to fetch user profile', error);
					}
				} else {
					setUser(null);
					localStorage.removeItem('user');
					localStorage.removeItem('userProfile');
				}
			});
		}

		unSubscribe();
	}, []);

	/*** Get User Additional Info ***/
	function GetAdditionalInfo(userInfo) {
		return getAdditionalUserInfo(userInfo).isNewUser;
	}

	/*** Google Provider Authentication ***/
	function GoogleAuthentication() {
		const googleProvider = new GoogleAuthProvider().setCustomParameters({
			prompt: 'select_account'
		});
		return signInWithPopup(firebaseAuth, googleProvider);
	}

	/*** Facebook Provider Authentication ***/
	function FacebookAuthentication() {
		const facebookProvider = new FacebookAuthProvider().setCustomParameters({
			prompt: 'select_account'
		});
		return signInWithPopup(firebaseAuth, facebookProvider);
	}

	/*** Reset Password ***/
	function ResetPassword(email) {
		return sendPasswordResetEmail(firebaseAuth, email);
	}

	/*** Verify Reset Password Link ***/
	function VerifyResetLink(oobCode) {
		return verifyPasswordResetCode(firebaseAuth, oobCode);
	}

	/*** Create New Password ***/
	function CreateNewPasswordLink(oobCode, password) {
		return confirmPasswordReset(firebaseAuth, oobCode, password);
	}

	/*** Logout ***/
	const logout = async () => {
		await signOut(firebaseAuth);
		toast(CONST.logoutSuccessfull, {
			position: 'top-right',
			closeButton: true
		});
		localStorage.clear();
	};

	/*** Sign-in authentication ***/
	function SignupAuthentication(email, password) {
		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	}

	/*** Sign-up authentication ***/
	function SigninAuthentication(email, password) {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	}

	/*** Email Verification Trigger ***/
	function EmailVerification(user) {
		const actionCodeSettings = {
			url: 'http://localhost:5173/', // Redirect user to your app
			handleCodeInApp: true // Ensures the link opens in your app
		};
		return sendEmailVerification(user, actionCodeSettings);
	}

	function VerifyEmail(oobCode) {
		return applyActionCode(firebaseAuth, oobCode);
	}

	return (
		<FirebaseContext.Provider
			value={{
				SignupAuthentication,
				SigninAuthentication,
				user,
				logout,
				ResetPassword,
				VerifyResetLink,
				CreateNewPasswordLink,
				EmailVerification,
				firebaseAuth,
				GoogleAuthentication,
				FacebookAuthentication,
				GetAdditionalInfo,
				VerifyEmail
			}}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
}
