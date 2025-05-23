import { toast } from 'sonner';
import CONST from './Constants';

export function HandleAuthToastMessage(pathName, isNewUser) {
	if (
		(pathName === 'sign-up' && isNewUser) ||
		(pathName === 'sign-in' && isNewUser)
	) {
		return toast(CONST.signupSuccessfull, {
			position: 'top-right',
			closeButton: true
		});
	} else {
		return toast(CONST.loginSuccessfull, {
			position: 'top-right',
			closeButton: true
		});
	}
}

export function RedirectAuthHandler(fetchedData, navigate) {
	if (fetchedData) {
		return navigate('/', { replace: true });
	} else {
		return navigate('/user-registration', { replace: true });
	}
}
