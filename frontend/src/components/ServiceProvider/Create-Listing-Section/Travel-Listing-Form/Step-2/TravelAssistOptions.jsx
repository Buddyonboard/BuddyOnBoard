import { ChevronDownIcon, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const travelOptions = [
	'Communication',
	'Navigating airport',
	'Security and Immigration',
	'Baggage collection and Customs'
];

export default function TravelAssistOptions({ value, onChange }) {
	const selectedOptions = value || [];

	const toggleSelection = (value) => {
		const newSelection = selectedOptions.includes(value)
			? selectedOptions.filter((v) => v !== value)
			: [...selectedOptions, value];
		onChange(newSelection);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="w-full">
						<div
							className="flex items-center justify-between border border-gray-300 rounded-md p-2 text-sm text-bob-filters-placeholder-color
							bg-primary-color w-full cursor-pointer"
						>
							<span className="truncate">
								{selectedOptions.length > 0
									? selectedOptions.join(', ')
									: 'Select Options'}
							</span>
							<ChevronDownIcon className="h-4 w-4" color="black" />
						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					align="start"
					className="w-full min-w-[280px] md:min-w-[300px] lg:min-w-[360px] rounded-md border bg-white p-2"
				>
					{travelOptions.map((option, i) => (
						<DropdownMenuItem
							key={i}
							className="flex items-center space-x-2 px-2 py-2 2xl:text-xl text-sm cursor-pointer"
							onSelect={(e) => {
								e.preventDefault(); // prevents menu from closing
								toggleSelection(option);
							}}
						>
							<Checkbox
								checked={selectedOptions.includes(option)}
								className="data-[state=checked]:bg-bob-color cursor-pointer border-black"
								readOnly
								CheckIconColor="text-white"
							/>
							<span className="text-bob-filters-placeholder-color">{option}</span>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
