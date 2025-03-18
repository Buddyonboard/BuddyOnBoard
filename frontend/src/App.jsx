import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import './App.css';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/Common-pages/PrivacyPolicy';
import HowItWorksLayout from './components/Landing/HowItWorksLayout';
import MainLayout from './pages/MainLayout';
import NotFound from './pages/Common-pages/404-Not-Found';
import ExploreFaq from './pages/Common-pages/Explore-Faq';
import ScrollToTop from './utils/ScrollToTop';

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
