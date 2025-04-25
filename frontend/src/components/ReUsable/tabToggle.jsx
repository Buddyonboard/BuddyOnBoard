import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TabToggle({ onToggle, tabNames, setValue, type }) {
	return (
		<div className="p-1 rounded-full inline-flex md:mb-8 mb-4">
			<Tabs defaultValue={type ? type : tabNames[0]} className="w-full">
				<TabsList className="grid w-full grid-cols-2 bg-bob-tabs-toggle-color">
					<TabsTrigger
						value={tabNames[0]}
						onClick={() => {
							onToggle();
							setValue('travel');
						}}
						className="font-medium"
					>
						{tabNames[0]}
					</TabsTrigger>
					<TabsTrigger
						value={tabNames[1]}
						onClick={() => {
							onToggle();
							setValue('courier');
						}}
						className="font-medium"
					>
						{tabNames[1]}
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
