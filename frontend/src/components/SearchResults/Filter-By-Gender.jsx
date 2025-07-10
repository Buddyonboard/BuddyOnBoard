import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import CONST from '@/utils/Constants';

export default function FilterByGender({ setSelectedGender }) {
	const handleSelect = (value) => {
		setSelectedGender(value);
	};

	return (
		<div className="w-full">
			<Select onValueChange={handleSelect}>
				<SelectTrigger className="w-full justify-between bg-primary-color data-[placeholder]:text-bob-filters-placeholder-color max-sm:*:data-[slot=select-value]:text-xs 2xl:*:data-[slot=select-value]:text-xl">
					<SelectValue placeholder={CONST.buddySearch.gender} />
				</SelectTrigger>
				<SelectContent className="w-full">
					<SelectItem value="male">Male</SelectItem>
					<SelectItem value="female">Female</SelectItem>
					<SelectItem value="no-preference">No preference</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
