import { createContext, useContext, useEffect, useState } from 'react';
import { app } from '@/config/firebase';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut
} from 'firebase/auth';

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

	/*** Logout ***/
	const logout = async () => {
		await signOut(firebaseAuth);
	};

	/*** Sign-in authentication ***/
	function SignupAuthentication(email, password) {
		return createUserWithEmailAndPassword(firebaseAuth, email, password);
	}

	/*** Sign-up authentication ***/
	function SigninAuthentication(email, password) {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	}

	return (
		<FirebaseContext.Provider
			value={{ SignupAuthentication, SigninAuthentication, user, logout }}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
}
