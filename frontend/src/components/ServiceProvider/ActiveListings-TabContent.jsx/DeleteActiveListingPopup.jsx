import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import API_URL from '../../../../environments/Environment-dev';
import axios from 'axios';
import { getuserProfile } from '@/utils/localStorageHelper';

export default function DeleteActiveListingPopup({
	open,
	onClose,
	listing_id,
	serviceType
}) {
	const handleDelete = async (serviceType, listing_id) => {
		try {
			const payloadData = {
				user_id: getuserProfile()._id,
				serviceType: serviceType,
				listing_id: listing_id
			};

			const res = await axios.post(`${API_URL}/delete-buddy-listing`, payloadData);

			if (res.status === 200) {
				alert('Listing deleted successfully!');

				window.location.reload();
			}
		} catch (err) {
			// console.error('Delete failed', err);
			alert('Error deleting listing. Please try again.');
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl">
				<div>
					<DialogTitle className="pb-3 mt-5 text-base 2xl:text-2xl sm:text-xl font-semibold text-secondary-color">
						Are you sure you want to delete your listing?
					</DialogTitle>

					<div className="text-bob-icon-placeholder-color font-normal text-base 2xl:text-2xl sm:text-xl">
						You will not able to reverse this action.
					</div>

					{/*********** Request Decline Action Button ***********/}
					<div className="py-6">
						<Button
							className="bg-bob-color border-2 border-bob-border-color
                        font-semibold 2xl:text-3xl lg:text-xl text-base cursor-pointer rounded-2xl w-full p-6"
							onClick={() => {
								handleDelete(serviceType, listing_id);
							}}
						>
							Delete my listing
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
