import { Button } from '@/components/ui/button';
import CONST from '@/utils/Constants';
import { useState } from 'react';
import DeleteActiveListingPopup from './DeleteActiveListingPopup';
import { useNavigate } from 'react-router-dom';

export default function ListingsActionButtons({
	price,
	listing_id,
	serviceType
}) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
	};

	/******** Handle Listing Edit Functionality ********/
	const formType =
		serviceType === 'Travel Buddy' ? 'travel-buddy-form' : 'courier-buddy-form';

	const handleEdit = (listing_id) => {
		navigate(`/edit-listing/${formType}/${listing_id}`);
	};

	return (
		<>
			<div className="flex md:flex-col flex-row items-start justify-center mx-15 md:max-lg:mx-0 md:max-lg:mr-5 mr-0 md:max-lg:self-start md:max-lg:justify-center md:max-lg:gap-2 max-sm:gap-5 gap-2 md:max-lg:mb-5 max-sm:ml-1">
				<div className="text-left mb-2 md:mb-0">
					<div className="2xl:text-xl md:text-sm text-xs text-bob-travel-details-color max-lg:w-max">
						{CONST.buddySearch.startPrice}
					</div>
					<div className="2xl:text-2xl font-semibold max-lg:text-left">${price}</div>
				</div>

				<div className="2xl:gap-5 gap-2 flex flex-row">
					<Button
						className="bg-bob-color border-2 border-bob-border-color
                    font-semibold 2xl:text-2xl lg:text-lg md:text-sm text-xs 2xl:px-16 lg:px-11 w-fit cursor-pointer rounded-2xl 2xl:py-7 lg:py-5"
						onClick={() => handleEdit(listing_id)}
					>
						Edit
					</Button>
					<Button
						className="border-2 border-bob-border-color bg-primary-color
                    text-bob-color font-semibold 2xl:text-2xl lg:text-lg md:text-sm text-xs 2xl:px-16 lg:px-11 w-fit cursor-pointer rounded-2xl 2xl:py-7 lg:py-5"
						onClick={() => {
							setOpen((prev) => !prev);
						}}
					>
						Delete
					</Button>
				</div>
			</div>

			<DeleteActiveListingPopup
				open={open}
				setOpen={setOpen}
				onClose={handleClose}
				listing_id={listing_id}
				serviceType={serviceType}
			/>
		</>
	);
}
