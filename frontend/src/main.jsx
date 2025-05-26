import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import FirebaseProvider from './context/Firebase-Context';
import { Toaster } from '@/components/ui/sonner';
import { BookingDataProvider } from './context/API/BookingDataProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<FirebaseProvider>
				<BookingDataProvider>
					<App />
				</BookingDataProvider>
				<Toaster />
			</FirebaseProvider>
		</QueryClientProvider>
	</StrictMode>
);
