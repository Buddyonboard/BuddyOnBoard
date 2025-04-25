import { useSearchParams, Navigate, useLocation } from 'react-router-dom';

export default function SearchRouteGuard({ children }) {
	const isAuthenticated = localStorage.getItem('user');
	const location = useLocation();

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

	if (!isValid) {
		return <Navigate to="/" replace />;
	}

	if (!isAuthenticated) {
		// Redirect to login with original destination
		return (
			<Navigate
				to={`/sign-in?redirect=${encodeURIComponent(
					location.pathname + location.search
				)}`}
				replace
			/>
		);
	}

	return children;
}
