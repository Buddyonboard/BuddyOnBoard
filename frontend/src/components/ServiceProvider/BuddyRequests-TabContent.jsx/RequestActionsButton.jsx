import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ViewRequestPopup from './ViewRequestPopup';
import axios from 'axios';
import API_URL from '../../../../environments/Environment-dev';
import { toast } from 'sonner';
import CONST from '@/utils/Constants';

export default function RequestActionsButton({ buddyRequestsList, type }) {
	const [open, setOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	/************** Function to handle decline/accept request ****************/
	const handleRequest = async (type) => {
		try {
			setSubmitted(true);

			const payloadData = {
				serviceSeekerId: buddyRequestsList?.service_Seeker_Id,
				requestId: buddyRequestsList?._id,
				serviceType: buddyRequestsList?.serviceType,
				action: type
			};

			const res = await axios.post(
				`${API_URL}/update-request-status`,
				payloadData
			);

			if (res?.status === 200) {
				window.location.reload();
			} else {
				setSubmitted(false);
			}
		} catch (error) {
			toast.warning(CONST.somethingWentWrong, {
				position: 'top-right',
				closeButton: true,
				style: {
					backgroundColor: 'red',
					color: 'white'
				}
			});
			// console.log('error >', error);
		}
	};

	return (
		<>
			{type === 'requestPopup' && (
				<div className="p-6 space-y-6">
					<div className="gap-5 flex lg:flex-row flex-col justify-evenly">
						<Button
							className="bg-bob-color border-2 border-bob-border-color
							font-semibold 2xl:text-3xl lg:text-xl md:text-base text-xs cursor-pointer rounded-2xl 2xl:py-7 lg:py-5 2xl:w-72 lg:w-60"
							onClick={() => handleRequest('accepted')}
							disabled={submitted}
						>
							Accept request
						</Button>
						<Button
							className="border-2 border-bob-border-color bg-primary-color
							text-bob-color font-semibold 2xl:text-3xl lg:text-xl md:text-base text-xs cursor-pointer rounded-2xl 2xl:py-7 lg:py-5 2xl:w-72 lg:w-60"
							onClick={() => handleRequest('rejected')}
							disabled={submitted}
						>
							Decline request
						</Button>
					</div>
				</div>
			)}

			{type === 'requestTab' && (
				<div className="2xl:ml-20 lg:ml-20 gap-5 flex lg:flex-col flex-row">
					<Button
						className="bg-bob-color border-2 border-bob-border-color
            			font-semibold 2xl:text-3xl lg:text-xl md:text-base text-xs 2xl:w-96 lg:w-60 md:w-42 w-30 cursor-pointer rounded-2xl 2xl:py-7 lg:py-5"
						onClick={() => handleRequest('accepted')}
						disabled={submitted}
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
			)}

			<ViewRequestPopup
				open={open}
				setOpen={setOpen}
				onClose={handleClose}
				buddyRequestsList={buddyRequestsList}
			/>
		</>
	);
}
