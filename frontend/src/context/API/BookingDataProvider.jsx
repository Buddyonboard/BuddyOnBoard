import { createContext, useContext, useEffect, useState } from 'react';
import WomenProfilePicPlaceholder from '@/assets/Common/WomenProfilePicPlaceholder.svg';
// import axios from 'axios';

const BookingDataContext = createContext();

export const BookingDataProvider = ({ children }) => {
	const bookingsData = [
		{
			id: 1,
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.4,
				type: 'Travel Buddy',
				preferences: 'Speaks English, Hindi, Tamil'
			},
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			status: 'active',
			connectionType: 'Direct'
		},
		{
			id: 2,
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.2,
				type: 'Courier Buddy',
				preferences: 'Prefers electronics, documents'
			},
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			status: 'cancelled',
			cancellationDate: '11th February, 2025',
			connectionType: '1 stop',
			connectionLocation: 'NYC'
		},
		{
			id: 2,
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.2,
				type: 'Courier Buddy',
				preferences: 'Prefers electronics, documents'
			},
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			status: 'pending',
			cancellationDate: '11th February, 2025',
			connectionType: '1 stop',
			connectionLocation: 'NYC'
		},
		{
			id: 2,
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.2,
				type: 'Courier Buddy',
				preferences: 'Prefers electronics, documents'
			},
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			status: 'completed',
			cancellationDate: '10th February, 2025',
			connectionType: '1 stop',
			connectionLocation: 'NYC'
		},
		{
			id: 2,
			user: {
				name: 'Sarah T.',
				verified: true,
				avatar: WomenProfilePicPlaceholder,
				rating: 4.2,
				type: 'Courier Buddy',
				preferences: 'Prefers electronics, documents'
			},
			departure: {
				time: '08:30 AM',
				date: '22 August, 2024',
				location: 'LAX, USA'
			},
			arrival: {
				time: '12:15 PM',
				date: '22 August, 2024',
				location: 'YVR, Canada'
			},
			status: 'accepted',
			cancellationDate: '10th February, 2025',
			connectionType: '1 stop',
			connectionLocation: 'NYC'
		}
	];

	const [bookings, setBookings] = useState([]);
	// const [loading, setLoading] = useState(true);

	useEffect(() => {
		// const fetchBookings = async () => {
		const fetchBookings = () => {
			try {
				// const response = await axios.get('/api/bookings');
				const response = bookingsData; //Remove this once you get API
				// setBookings(response.data);
				setBookings(response); //Remove this once you get API
			} catch (error) {
				console.error('Error fetching bookings:', error);
			}
		};
		fetchBookings();
	}, []);

	return (
		<BookingDataContext.Provider value={{ bookings }}>
			{children}
		</BookingDataContext.Provider>
	);
};

// Custom hook for easy access
export const useBookings = () => useContext(BookingDataContext);
