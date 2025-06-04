import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CONST from '@/utils/Constants';

export default function VeriffRedirectPopup({ open, onClose }) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md 2xl:text-3xl 2xl:min-w-fit text-center text-bob-form-label-color mb-10">
				<DialogHeader>
					<DialogTitle className="text-secondary-color font-medium font-merriweather 2xl:text-4xl lg:text-3xl text-xl mt-3 text-center">
						{CONST.serviceProviderModule.veriffPopupDialog.title}
					</DialogTitle>
				</DialogHeader>
				{CONST.serviceProviderModule.veriffPopupDialog.description}
				<div>
					<Button
						className="font-semibold md:text-xl text-sm rounded-2xl 
                        bg-bob-color text-primary-color border-bob-border-color 
                        border-2 p-6 cursor-pointer md:mt-5 mt-4 w-full"
					>
						Continue
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
