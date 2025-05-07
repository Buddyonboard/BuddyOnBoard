import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import CONST from '@/utils/Constants';

export default function RequestSubmitPopup({ open, onClose }) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md 2xl:text-3xl 2xl:min-w-fit text-center text-bob-form-label-color mb-10">
				<DialogHeader>
					<DialogTitle className="text-secondary-color font-normal 2xl:text-4xl text-xl mt-3 text-center">
						{CONST.sendRequestForm.requestSubmitPopupTitle}
					</DialogTitle>
				</DialogHeader>
				{CONST.sendRequestForm.requestSubmitPopupContent}
			</DialogContent>
		</Dialog>
	);
}
