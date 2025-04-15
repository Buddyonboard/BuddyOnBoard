import { Button } from '@/components/ui/button';
import BookingCancellationPopup from './Bookings-Cancel-Popup';
import { useState } from 'react';

export default function BookingsActionButtons() {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className="lg:ml-10 md:ml-14 gap-5 flex lg:flex-col flex-row">
				<Button
					className="bg-bob-color border-2 border-bob-border-color
            		hover:bg-bob-color font-semibold lg:text-xl md:text-base text-sm lg:w-60 	md:w-42 w-33 cursor-pointer rounded-2xl lg:py-5"
				>
					Send message
				</Button>
				<Button
					className="border-2 border-bob-border-color bg-primary-color
                	text-bob-color font-semibold lg:text-xl md:text-base text-sm lg:w-60 md:w-42 w-33 cursor-pointer rounded-2xl lg:py-5"
					onClick={() => {
						setOpen((prev) => !prev);
					}}
				>
					Cancel trip
				</Button>
			</div>

			<BookingCancellationPopup
				open={open}
				setOpen={setOpen}
				onClose={handleClose}
			/>
		</>
	);
}
