import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

export default function SortByOption() {
	return (
		<Select>
			<SelectTrigger className="w-auto text-nowrap justify-between shadow-none text-bob-filters-placeholder-color font-semibold">
				<SelectValue placeholder="Relevance" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="relevance">Relevance</SelectItem>
				<SelectItem value="lowestprice">Lowest price</SelectItem>
				<SelectItem value="earliesttraveldate">Earliest travel date</SelectItem>
			</SelectContent>
		</Select>
	);
}
