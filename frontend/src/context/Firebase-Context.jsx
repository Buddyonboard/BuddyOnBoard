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
	sendEmailVerification
} from 'firebase/auth';
import { toast } from 'sonner';
import CONST from '@/utils/Constants';

const FirebaseContext = createContext();

const firebaseAuth = getAuth(app);

/*** Custom Firebase Hook ***/
export const useFirebase = () => useContext(FirebaseContext);

export default function FirebaseProvider(props) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		function unSubscribe() {
			onAuthStateChanged(firebaseAuth, (user) => {
				if (user) {
					setUser(user);
					localStorage.setItem('user', JSON.stringify(user));
				} else {
					setUser(null);
					localStorage.removeItem('user');
				}
			});
		}

		unSubscribe();
	}, []);

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
	};

	/*** Sign-in authentication ***/
	function SignupAuthentication(email, password) {
		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	}

	/*** Sign-up authentication ***/
	function SigninAuthentication(email, password) {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	}

	function EmailVerification(user) {
		const actionCodeSettings = {
			url: 'http://localhost:5173/user-registration', // Redirect user to your app
			handleCodeInApp: true // Ensures the link opens in your app
		};
		return sendEmailVerification(user, actionCodeSettings);
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
				firebaseAuth
			}}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
}
