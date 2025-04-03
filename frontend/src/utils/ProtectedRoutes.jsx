import { Navigate, Outlet } from 'react-router-dom';
import { getTokenDetails } from './localStorageHelper';

/*** Private Route: Only Logged-in Users Can Access ***/
export function PrivateRoute() {
	return getTokenDetails() ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

/*** Auth Route: Prevent Logged-in Users from Seeing Login/Signup Pages ***/
export function AuthRoute() {
	return getTokenDetails() ? <Navigate to="/" replace /> : <Outlet />;
}

/*** Register Route: Only Accessible Right After Signup :: Later Reference ***/
/* export function RegisterRoute() {
	const Token = getTokenDetails();
	const hasCompletedRegistration = Token?.displayName; // Example: Check if user has completed profile
	return user && !hasCompletedRegistration ? (
		<Outlet />
	) : (
		<Navigate to="/dashboard" replace />
	);
} */
