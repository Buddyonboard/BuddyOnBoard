import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import CONST from '@/utils/Constants';

export default function CourierItemFilter({ setSelectedCourierFilter }) {
	const handleSelect = (value) => {
		setSelectedCourierFilter(value);
	};

	return (
		<div className="w-full">
			<Select onValueChange={handleSelect}>
				<SelectTrigger className="w-full justify-between bg-primary-color data-[placeholder]:text-bob-filters-placeholder-color max-sm:*:data-[slot=select-value]:text-xs 2xl:*:data-[slot=select-value]:text-xl">
					<SelectValue placeholder={CONST.buddySearch.courierItem} />
				</SelectTrigger>

				<SelectContent className="w-full">
					<SelectItem value="Documents">Documents</SelectItem>
					<SelectItem value="Clothes">Clothes</SelectItem>

					{/* Grouped Electronics Sub-options */}
					<SelectGroup>
						<SelectLabel className="font-bold text-bob-form-label-color text-base">
							Electronics
						</SelectLabel>
						<SelectItem value="Electronics (Open box with invoice)">
							Open box with invoice
						</SelectItem>
						<SelectItem value="Electronics (Open box without invoice)">
							Open box without invoice
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
