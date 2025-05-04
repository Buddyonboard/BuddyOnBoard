import CONST from '@/utils/Constants';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function SendRequestButton({ price, buddyDetails }) {
	const navigate = useNavigate();

	const handleSendRequest = (buddy) => {
		navigate('/send-request', { state: { buddy } });
	};

	return (
		<div className="flex lg:flex-col flex-row items-center justify-center ml-15 gap-2 md:max-lg:self-start md:max-lg:justify-center md:max-lg:gap-5 md:max-lg:ml-11 md:max-lg:mb-5 max-sm:ml-1 max-sm:gap-7">
			<div className="text-center mb-2 md:mb-0">
				<div className="md:text-sm text-xs text-bob-travel-details-color max-lg:w-max">
					{CONST.buddySearch.startPrice}
				</div>
				<div className="font-semibold max-lg:text-left">${price}</div>
			</div>
			<Button
				className="w-full md:max-lg:w-[85%] max-sm:w-[70%] rounded-2xl border-2 font-semibold      border-bob-border-color bg-bob-color cursor-pointer"
				onClick={() => handleSendRequest(buddyDetails)}
			>
				{CONST.buddySearch.sendRequest.name}
			</Button>
		</div>
	);
}
