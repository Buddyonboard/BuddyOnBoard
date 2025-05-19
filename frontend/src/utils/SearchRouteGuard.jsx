import { useEffect } from 'react';
import { useSearchParams, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export default function SearchRouteGuard({ children }) {
	const isAuthenticated = localStorage.getItem('user');
	const location = useLocation();
	const isEmailVerified = JSON.parse(isAuthenticated)?.emailVerified;

	const [params] = useSearchParams();

	const serviceType = params.get('serviceType');
	const from = params.get('from');
	const to = params.get('to');
	const date = params.get('date');
	const packageType = params.get('packageType');

	const isCourier = serviceType === 'courier';

	const isValid =
		serviceType &&
		from &&
		to &&
		date &&
		(!isCourier || (isCourier && packageType));

	// If Query Params not valid
	if (!isValid) {
		return <Navigate to="/" replace />;
	}

	// If email not verified, show toast
	useEffect(() => {
		if (isAuthenticated && !isEmailVerified) {
			toast.warning('Email not verified. Please verify your email.', {
				position: 'top-right',
				closeButton: true
			});
		}
	}, [isAuthenticated, isEmailVerified]);

	// If email not verified redirect
	if (isAuthenticated && !isEmailVerified) {
		return <Navigate to="/" replace />;
	}

	// If user not authenticated Redirect to login with original destination
	if (!isAuthenticated) {
		return (
			<Navigate
				to={`/sign-in?redirect=${encodeURIComponent(
					location.pathname + location.search
				)}`}
				replace
			/>
		);
	}

	// If everything is valid
	return children;
}
