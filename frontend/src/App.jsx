import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
// import LandingPage from './pages/LandingPage';
// import PrivacyPolicy from './pages/Common-pages/PrivacyPolicy';
// import HowItWorksLayout from './components/Landing/HowItWorksLayout';

// import MainLayout from './pages/MainLayout';

// import NotFound from './pages/Common-pages/404-Not-Found';
// import ExploreFaq from './pages/Common-pages/Explore-Faq';
// import FeatureReqForm from './components/Forms/Feature-Req-Form';
// import ReportIssueForm from './components/Forms/Report-Issue-Form';
import ScrollToTop from './utils/ScrollToTop';
import { AuthRoute, PrivateRoute } from './utils/ProtectedRoutes';
import FirebaseRedirectHandler from './utils/FirebaseRedirectHandler';
import { BookingCancellationProvider } from './context/Booking-Cancellation-Context';

// import UserProfile from './pages/Common-pages/User-Profile';
// import SignIn from './auth/Sign-in/Sign-in';
// import SignUp from './auth/Sign-up/Sign-up';
// import UserRegistrationForm from './components/Forms/Post-Signup-Form';
// import ResetPassword from './auth/Forgot-Password/Reset-Password';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const PrivacyPolicy = lazy(() => import('./pages/Common-pages/PrivacyPolicy'));
const AboutUs = lazy(() => import('./pages/Common-pages/About-Us'));
const HowItWorksLayout = lazy(() =>
	import('./components/Landing/HowItWorksLayout')
);
const MainLayout = lazy(() => import('./pages/MainLayout'));
const NotFound = lazy(() => import('./pages/Common-pages/404-Not-Found'));
const ExploreFaq = lazy(() => import('./pages/Common-pages/Explore-Faq'));
const FeatureReqForm = lazy(() =>
	import('./components/Forms/Feature-Req-Form')
);
const ReportIssueForm = lazy(() =>
	import('./components/Forms/Report-Issue-Form')
);
const SignIn = lazy(() => import('./auth/Sign-in/Sign-in'));
const SignUp = lazy(() => import('./auth/Sign-up/Sign-up'));
const UserRegistrationForm = lazy(() =>
	import('./components/Forms/User-Registration-Form')
);
const ResetPassword = lazy(() =>
	import('./auth/Forgot-Password/Reset-Password')
);
const UserProfile = lazy(() =>
	import('./components/Forms/Profile-Page/User-Profile')
);
const BookingsLayout = lazy(() => import('./pages/Bookings-Layout'));

function App() {
	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<div>Loading....</div>}>
					<ScrollToTop />
					<Routes>
						{/* Public Default Route */}
						<Route path="/" element={<LandingPage />} />

						{/* Routes inside Layout */}
						<Route
							path="/*"
							element={
								<MainLayout>
									<Routes>
										{/* This route will handle Firebase auth links */}
										<Route
											path="firebase-redirect"
											element={<FirebaseRedirectHandler />}
										/>
										{/* Public Routes (Anyone Can Access) */}
										<Route path="privacy-policy" element={<PrivacyPolicy />} />
										<Route path="about-us" element={<AboutUs />} />
										<Route path="how-it-works" element={<HowItWorksLayout />} />
										<Route path="explore-faqs" element={<ExploreFaq />} />
										<Route path="service-request" element={<FeatureReqForm />} />
										<Route path="report-issue" element={<ReportIssueForm />} />
										<Route path="forgot-password" element={<ResetPassword />} />

										{/* Auth Routes (Restricted for Logged-in Users) */}
										<Route element={<AuthRoute />}>
											<Route path="sign-in" element={<SignIn />} />
											<Route path="sign-up" element={<SignUp />} />
										</Route>

										{/* Private Routes (Only Logged-in Users Can Access) */}
										<Route element={<PrivateRoute />}>
											<Route path="user-registration" element={<UserRegistrationForm />} />
											<Route path="user-profile" element={<UserProfile />} />
											<Route
												path="bookings"
												element={
													<BookingCancellationProvider>
														<BookingsLayout />
													</BookingCancellationProvider>
												}
											/>
										</Route>

										{/* Redirect incorrect routes inside layout */}
										<Route path="*" element={<NotFound />} />
									</Routes>
								</MainLayout>
							}
						/>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
}

export default App;
