import { Button } from '@/components/ui/button';
import { useFirebase } from '@/context/Firebase-Context';
import { HandleAuthToastMessage } from '@/utils/authHelper';
import CONST from '@/utils/Constants';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrorHandler';
import { getuserProfile } from '@/utils/localStorageHelper';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function GoogleSignInButton({ pathName }) {
	const navigate = useNavigate();
	const firebase = useFirebase();

	const [params] = useSearchParams();
	const redirectTo = params.get('redirect');

	/*** Google Sign in handler ***/
	async function handleGoogleLogin() {
		try {
			/*** Google Authentication Handler ***/
			const result = await firebase.GoogleAuthentication();
			// console.log('result >', result);

			/*** Check if it's a new user using `getAdditionalUserInfo` ***/
			const isNewUser = firebase.GetAdditionalInfo(result);
			// localStorage.setItem('isNewUser', isNewUser);
			// console.log('isNewUser >', isNewUser);

			/*** Handling toast message to be shown conditionally ***/
			HandleAuthToastMessage(pathName, isNewUser);

			/*** Get User Profile Data ***/
			const fetchedData = getuserProfile();

			/**
			 * Redirect to search URL if user Profile exisits
			 * If user profile not there redirect to user registration page
			 **/
			redirectTo && fetchedData
				? navigate(redirectTo, { replace: true })
				: // : RedirectAuthHandler(fetchedData, navigate);
				  navigate('/', { replace: true });
		} catch (error) {
			const message = getFirebaseErrorMessage(error?.code);
			toast(message, {
				position: 'top-right',
				closeButton: true
			});
			// console.error('Google Sign-in Error:', error);
		}
	}

	return (
		<div className="flex justify-center p-4 md:min-h-[100px] items-center">
			<Button
				onClick={handleGoogleLogin}
				className="flex items-center gap-2 bg-white text-gray-700
				hover:bg-gray-100 rounded-medium px-4 py-2 font-medium text-sm
				shadow-sm border border-gray-200 cursor-pointer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					className="w-5 h-5"
				>
					<path
						fill="#4285F4"
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
					/>
					<path
						fill="#34A853"
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
					/>
					<path
						fill="#FBBC05"
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
					/>
					<path
						fill="#EA4335"
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
					/>
				</svg>
				{CONST.signInWithGoogle}
			</Button>
		</div>
	);
}
