import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import './App.css';
import LandingPage from './pages/LandingPage';

function App() {
	return (
		<>
			<BrowserRouter>
				<Suspense fallback={<div>Loading....</div>}>
					<Routes>
						{/* Default Route */}
						<Route path="/" element={<LandingPage />} />

						{/* Login/Registration Routes */}
						{/* <Route path="/registration" element={<HotelAuth />} />
          <Route path="/login" element={<HotelAuth />} /> */}

						{/* Protected Admin Routes */}
						{/* <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Dashboard />}>
              <Route index element={<BentoGrid />} />
              <Route path="menu" element={<MenuItems />} />
             
              <Route path="qrcodes" element={<GenerateQr />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </Route>
          </Route> */}

						{/* Customer Page Routes */}
						{/* <Route path="/customermenuview/category" element={<CustomerPage />}>
            <Route index element={<MenuItemsPage />} />
            <Route path=":menu" element={<CategoryItems />} />
            <Route path="*" element={<Navigate to="/customermenuview/category" />} />
          </Route> */}

						{/* <Route path="/menu/:restaurantId/:tableId" element={<CustomerPage />} /> */}

						{/* Redirect Incorrect Route */}
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
}

export default App;
