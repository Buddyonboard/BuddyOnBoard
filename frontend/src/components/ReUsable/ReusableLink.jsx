import { useFirebase } from '@/context/Firebase-Context';
import CONST from '@/utils/Constants';
import API_URL from '../../../environments/Environment-dev';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { showWarningToast } from '@/utils/toastUtils';
import { useState } from 'react';

export default function ReusableLink({
	to,
	className,
	linkName,
	type,
	serviceType,
	booking
}) {
	const [loading, setLoading] = useState(false);
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
			case 'confirmPay':
				event.preventDefault();
				handleCheckout(booking);
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

	/************ To Handle Stripe Payment Checkout ***************/
	const handleCheckout = async (booking) => {
		try {
			setLoading(true);
			const response = await axios.post(
				`${API_URL}/payment/create-checkout-session`,
				{
					bookingId: booking?._id,
					totalPrice: booking?.totalAmount?.totalPrice,
					serviceProviderId: booking?.service_Provider_Id
				}
			);

			setLoading(false);
			window.location.href = response?.data?.url;
		} catch (error) {
			// console.error('Checkout Error:', error);
			showWarningToast();
		}
	};

	if (loading) return <div>Loading....</div>;

	return (
		<Link to={to} className={className} onClick={(e) => handleClick(e)}>
			{linkName}
		</Link>
	);
}
