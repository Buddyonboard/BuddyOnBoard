import { Button } from '@/components/ui/button';
import { useFirebase } from '@/context/Firebase-Context';
import {
	HandleAuthToastMessage,
	RedirectAuthHandler
} from '@/utils/authHelper';
import CONST from '@/utils/Constants';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrorHandler';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function FacebookSignInButton({ pathName }) {
	const navigate = useNavigate();
	const firebase = useFirebase();

	const [params] = useSearchParams();
	const redirectTo = params.get('redirect');

	/*** Facebook Sign in handler ***/
	async function handleFacebookLogin() {
		try {
			const result = await firebase.FacebookAuthentication();
			// console.log('result >', result);

			/* Check if it's a new user using `getAdditionalUserInfo` */
			const isNewUser = firebase.GetAdditionalInfo(result);
			// console.log('isNewUser >', isNewUser);

			/* Handling toast message to be shown conditionally */
			HandleAuthToastMessage(pathName, isNewUser);

			/* Redirect ONLY if it's a new user signing in */
			redirectTo && !isNewUser
				? navigate(redirectTo, { replace: true })
				: RedirectAuthHandler(isNewUser, navigate);
		} catch (error) {
			const message = getFirebaseErrorMessage(error?.code);
			toast(message, {
				position: 'top-right',
				closeButton: true
			});
			// console.error('Facebook Sign-in Error:', error);
		}
	}

	return (
		<div className="flex justify-center md:p-4 p-2 md:min-h-[100px] items-center">
			<Button
				onClick={handleFacebookLogin}
				className="flex items-center justify-center gap-2 rounded-md font-medium
                bg-[#1877F2] text-sm text-white hover:bg-[#0b5fcc] px-4 py-2
                cursor-pointer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="shrink-0 h-5 w-5"
				>
					<path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
				</svg>
				{CONST.signInWithFacebook}
			</Button>
		</div>
	);
}
