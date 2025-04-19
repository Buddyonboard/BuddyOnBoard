import CONST from '@/utils/Constants';
import { Button } from '../ui/button';

export default function SendRequestButton({ price }) {
	return (
		<div className="flex flex-col items-center justify-center ml-15 gap-2">
			<div className="text-center mb-2 md:mb-0">
				<div className="text-sm text-bob-travel-details-color">
					{CONST.buddySearch.startPrice}
				</div>
				<div className="font-semibold">${price}</div>
			</div>
			<Button className="w-full rounded-2xl border-2 font-semibold         border-bob-border-color bg-bob-color cursor-pointer">
				{CONST.buddySearch.sendRequest}
			</Button>
		</div>
	);
}
