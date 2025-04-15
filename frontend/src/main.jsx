import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import FirebaseProvider from './context/Firebase-Context';
import { Toaster } from '@/components/ui/sonner';
import { BookingDataProvider } from './context/API/BookingDataProvider';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<FirebaseProvider>
			<BookingDataProvider>
				<App />
			</BookingDataProvider>
			<Toaster />
		</FirebaseProvider>
	</StrictMode>
);
