import { Button } from '@/components/ui/button';
import CONST from '@/utils/Constants';
import { useNavigate } from 'react-router-dom';

export default function SendRequestButton({ selectedBuddyInfo }) {
	const navigate = useNavigate();

	const handleSendRequest = (buddy) => {
		navigate('/send-request', { state: { buddy } });
	};

	return (
		<div className="flex justify-center">
			<Button
				className="mt-2 w-7/10 max-lg:w-full max-sm:py-2 py-5 
                bg-bob-color border-2 border-bob-border-color rounded-2xl
                max-sm:text-sm text-xl 2xl:text-2xl font-semibold cursor-pointer"
				onClick={() => handleSendRequest(selectedBuddyInfo)}
			>
				{CONST.buddySearch.sendRequest.name}
			</Button>
		</div>
	);
}
