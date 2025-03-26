import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyBzqy0c4KKOIjKYfg-8P_s9_PGegNEio6Q',
	authDomain: 'buddy-on-board.firebaseapp.com',
	projectId: 'buddy-on-board',
	storageBucket: 'buddy-on-board.firebasestorage.app',
	messagingSenderId: '86841068596',
	appId: '1:86841068596:web:150743f4b7a05b61530e61'
};

export const app = initializeApp(firebaseConfig);
