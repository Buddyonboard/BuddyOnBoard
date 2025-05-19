import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getTokenDetails, getuserProfile } from './localStorageHelper';

/*** Private Route: Only Logged-in Users Can Access ***/
export function PrivateRoute() {
	return getTokenDetails() ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

/*** Auth Route: Prevent Logged-in Users from Seeing Login/Signup Pages ***/
export function AuthRoute() {
	return getTokenDetails() ? <Navigate to="/" replace /> : <Outlet />;
}

/*** User Registration Form Route Guard ***/
export function RegistrationRoute() {
	const hasCompletedRegistration = getuserProfile();

	return !hasCompletedRegistration && getTokenDetails() ? (
		<Outlet />
	) : (
		<Navigate to="/" replace />
	);
}

/***** Block App Access if Registration Not Completed *****/
export function BlockOtherRoutesIfUnregistered() {
	const location = useLocation();
	const hasCompletedRegistration = getuserProfile();

	/*** Allow /user-registration if profile incomplete ***/
	if (!hasCompletedRegistration && location.pathname !== '/user-registration') {
		return <Navigate to="/user-registration" replace />;
	}

	return <Outlet />;
}
