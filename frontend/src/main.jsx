import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import FirebaseProvider from './context/Firebase-Context';
import { Toaster } from '@/components/ui/sonner';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<FirebaseProvider>
			<App />
			<Toaster />
		</FirebaseProvider>
	</StrictMode>
);
