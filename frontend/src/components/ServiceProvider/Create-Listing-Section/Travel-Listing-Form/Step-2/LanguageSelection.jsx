import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import useLanguages from '@/hooks/useLanguages';

export default function LanguageSelection({ value, onChange }) {
	const { data } = useLanguages();

	return (
		<>
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{data?.data.map((item, index) => (
						<SelectItem key={index} value={item.Language}>
							{item.Language}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
}
