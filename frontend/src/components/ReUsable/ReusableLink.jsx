import { useFirebase } from '@/context/Firebase-Context';
import CONST from '@/utils/Constants';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ReusableLink({
	to,
	className,
	linkName,
	type,
	serviceType,
	booking
}) {
	const navigate = useNavigate();

	/********** To Switch to different methods based on type ***********/
	const handleClick = (event) => {
		switch (type) {
			case 'verifyEmail':
				handleResendVerifyEmail();
				break;
			case 'editRequest':
				event.preventDefault();
				handleEditRequest(serviceType, booking);
				break;
			default:
				break;
		}
	};

	/********** Verify Email Method Handler ***********/
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

	/********** To Handle Edit Request Booking ***********/
	function handleEditRequest(serviceType, requestDetails) {
		navigate('/send-request', {
			state: {
				isEdit: true,
				serviceType,
				requestDetails
			}
		});
	}

	return (
		<Link to={to} className={className} onClick={(e) => handleClick(e)}>
			{linkName}
		</Link>
	);
}
