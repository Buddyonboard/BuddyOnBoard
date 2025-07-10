import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';

export default function SelectPackageType({
	setSelectedPackageType,
	selectedPackageType
}) {
	const handleSelectChange = (value) => {
		setSelectedPackageType(value);
	};

	return (
		<Select onValueChange={handleSelectChange} value={selectedPackageType}>
			<SelectTrigger
				className="w-full border-0 outline-none border-none focus-visible:ring-0 data-[placeholder]:text-bob-text-placeholder-color"
				hideIcon={true}
			>
				<SelectValue placeholder="Select your item" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="Documents">Documents</SelectItem>
				<SelectItem value="Clothes">Clothes</SelectItem>
				<SelectItem value="Electronics (Open box with invoice)">
					Electronics (Open box with invoice)
				</SelectItem>
				<SelectItem value="Electronics (Open box without invoice)">
					Electronics (Open box without invoice)
				</SelectItem>
			</SelectContent>
		</Select>
	);
}
