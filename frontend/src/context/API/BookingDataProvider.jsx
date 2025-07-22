import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../../environments/Environment-dev';
import { getSeekerId } from '@/utils/localStorageHelper';

const BookingDataContext = createContext();

export const BookingDataProvider = ({ children }) => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBookings = async () => {
			const seekerID = getSeekerId();
			setLoading(true);

			try {
				const response = await axios.get(`${API_URL}/booking-requests/${seekerID}`);

				setBookings(response.data.data);
			} catch (error) {
				// console.error('Error fetching bookings:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchBookings();
	}, []);

	return (
		<BookingDataContext.Provider value={{ bookings, loading }}>
			{children}
		</BookingDataContext.Provider>
	);
};

// Custom hook for easy access
export const useBookings = () => useContext(BookingDataContext);
