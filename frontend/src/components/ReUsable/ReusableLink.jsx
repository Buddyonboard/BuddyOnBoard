import { useFirebase } from '@/context/Firebase-Context';
import CONST from '@/utils/Constants';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function ReusableLink({ to, className, linkName, type }) {
	const firebase = useFirebase();

	async function handleResendVerifyEmail() {
		const user = firebase.firebaseAuth.currentUser;
		await firebase.EmailVerification(user);

		toast.success(CONST.emailVerificationTitle, {
			description: CONST.emailVerificationDescription,
			position: 'top-right',
			closeButton: true
		});
	}

	return (
		<Link
			to={to}
			className={className}
			onClick={type === 'verifyEmail' && handleResendVerifyEmail}
		>
			{linkName}
		</Link>
	);
}
