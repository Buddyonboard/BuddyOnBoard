import { Button } from '@/components/ui/button';
import CompletedListingPopup from './CompletedListingPopup';
import { useState } from 'react';

export default function ListingsStatus({ previousListingsList }) {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			{previousListingsList?.listingStatus === 'completed' && (
				<div className="2xl:mx-20 lg:mx-10 md:mr-1 max-sm:mb-6">
					<Button
						className="border-2 border-bob-border-color bg-primary-color
                        text-bob-color font-semibold 2xl:text-2xl lg:text-lg md:text-xs
                        text-xs 2xl:w-md lg:w-2xs cursor-pointer rounded-2xl 2xl:py-7 lg:py-5"
						onClick={() => {
							setOpen((prev) => !prev);
						}}
					>
						{previousListingsList?.serviceType === 'Courier Buddy'
							? 'View completed courier'
							: 'View completed trip'}
					</Button>
				</div>
			)}

			{previousListingsList?.listingStatus === 'expired' && (
				<div
					className="2xl:text-3xl lg:text-2xl md:text-lg text-base text-secondary-color font-semibold text-center 2xl:mx-20 lg:mx-10 
                    max-sm:mb-6"
				>
					No buddies accepted
				</div>
			)}

			{previousListingsList?.listingStatus === 'deleted' && (
				<div
					className="2xl:text-3xl lg:text-2xl md:text-lg text-base text-secondary-color font-semibold text-center 2xl:mx-20 lg:mx-10 
                    max-sm:mb-6"
				>
					Listing has been deleted
				</div>
			)}

			<CompletedListingPopup
				open={open}
				setOpen={setOpen}
				onClose={handleClose}
				previousListingsList={previousListingsList}
			/>
		</>
	);
}
