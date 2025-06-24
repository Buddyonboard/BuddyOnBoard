import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

export default function CompanionPreference({ value, onChange }) {
	return (
		<div className="w-full">
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger className="w-full justify-between bg-primary-color data-[placeholder]:text-bob-filters-placeholder-color max-sm:*:data-[slot=select-value]:text-xs">
					<SelectValue />
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
