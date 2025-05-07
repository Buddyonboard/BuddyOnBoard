import { Button } from '@/components/ui/button';
import CONST from '@/utils/Constants';

export default function SendRequestButton({ handleRequestSubmit }) {
	return (
		<Button
			className="w-full bg-bob-color border-2 
            border-bob-border-color rounded-2xl 2xl:text-2xl text-xl 
            max-sm:text-sm max-sm:py-2 py-5 font-semibold cursor-pointer"
			onClick={handleRequestSubmit}
		>
			{CONST.buddySearch.sendRequest.name}
		</Button>
	);
}
