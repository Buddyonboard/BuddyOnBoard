import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export default function DeleteActiveListingPopup({ open, onClose }) {
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
						>
							Delete my listing
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
