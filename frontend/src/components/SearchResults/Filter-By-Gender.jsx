import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import CONST from '@/utils/Constants';

export default function FilterByGender() {
	return (
		<div>
			<Select>
				<SelectTrigger className="w-full justify-between bg-primary-color data-[placeholder]:text-bob-filters-placeholder-color">
					<SelectValue placeholder={CONST.buddySearch.gender} />
				</SelectTrigger>
				<SelectContent className="w-full">
					<SelectItem value="male">Male</SelectItem>
					<SelectItem value="female">Female</SelectItem>
					<SelectItem value="non-preference">No preference</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
