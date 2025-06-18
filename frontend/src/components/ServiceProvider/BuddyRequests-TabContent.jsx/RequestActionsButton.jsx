import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ViewRequestPopup from './ViewRequestPopup';

export default function RequestActionsButton({ buddyRequestsList }) {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className="2xl:ml-20 lg:ml-20 gap-5 flex lg:flex-col flex-row">
				<Button
					className="bg-bob-color border-2 border-bob-border-color
            		font-semibold 2xl:text-3xl lg:text-xl md:text-base text-xs 2xl:w-96 lg:w-60 md:w-42 w-30 cursor-pointer rounded-2xl 2xl:py-7 lg:py-5"
				>
					Accept request
				</Button>
				<Button
					className="border-2 border-bob-border-color bg-primary-color
                	text-bob-color font-semibold 2xl:text-3xl lg:text-xl md:text-base text-xs 2xl:w-96 lg:w-60 md:w-42 w-30 cursor-pointer rounded-2xl 2xl:py-7 lg:py-5"
					onClick={() => {
						setOpen((prev) => !prev);
					}}
				>
					View more
				</Button>
			</div>

			<ViewRequestPopup
				open={open}
				setOpen={setOpen}
				onClose={handleClose}
				buddyRequestsList={buddyRequestsList}
			/>
		</>
	);
}
