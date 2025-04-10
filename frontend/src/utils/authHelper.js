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

export function RedirectAuthHandler(isNewUser, navigate) {
	if (isNewUser) {
		return navigate('/user-registration', { replace: true });
	} else {
		return navigate('/', { replace: true });
	}
}
