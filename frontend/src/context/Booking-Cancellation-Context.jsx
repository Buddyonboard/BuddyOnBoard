import { createContext, useContext, useState } from 'react';

const BookingCancellationContext = createContext();

export const BookingCancellationProvider = ({ children }) => {
	const [cancelConfirmed, setCancelConfirmed] = useState(false);
	return (
		<BookingCancellationContext.Provider
			value={{ cancelConfirmed, setCancelConfirmed }}
		>
			{children}
		</BookingCancellationContext.Provider>
	);
};

export const useBookingCancellation = () =>
	useContext(BookingCancellationContext);
