import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

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
import SignIn from './auth/Sign-in/Sign-in';
import SignUp from './auth/Sign-up/Sign-up';
import PostSignupForm from './components/Forms/Post-Signup-Form';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const PrivacyPolicy = lazy(() => import('./pages/Common-pages/PrivacyPolicy'));
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

function App() {
	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<div>Loading....</div>}>
					<ScrollToTop />
					<Routes>
						{/* Default Route */}
						<Route path="/" element={<LandingPage />} />

						{/* Routes inside Layout */}
						<Route
							path="/*"
							element={
								<MainLayout>
									<Routes>
										<Route path="privacy-policy" element={<PrivacyPolicy />} />
										<Route path="how-it-works" element={<HowItWorksLayout />} />
										<Route path="explore-faqs" element={<ExploreFaq />} />
										<Route path="feature-request" element={<FeatureReqForm />} />
										<Route path="report-issue" element={<ReportIssueForm />} />
										<Route path="sign-in" element={<SignIn />} />
										<Route path="sign-up" element={<SignUp />} />
										<Route path="user-registration" element={<PostSignupForm />} />

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
