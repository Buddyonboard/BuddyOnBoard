import { Button } from '@/components/ui/button';
import CONST from '@/utils/Constants';

export default function SendRequestButton() {
	return (
		<div className="flex justify-center">
			<Button
				className="mt-2 w-7/10 max-lg:w-full max-sm:py-2 py-5 
                bg-bob-color border-2 border-bob-border-color rounded-2xl
                max-sm:text-sm text-xl font-semibold cursor-pointer"
			>
				{CONST.buddySearch.sendRequest}
			</Button>
		</div>
	);
}
