import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

export default function LanguageSelection({ value, onChange }) {
	return (
		<>
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="English">English</SelectItem>
					<SelectItem value="Spanish">Spanish</SelectItem>
					<SelectItem value="French">French</SelectItem>
					<SelectItem value="German">German</SelectItem>
					<SelectItem value="Italian">Italian</SelectItem>
				</SelectContent>
			</Select>
		</>
	);
}
