import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TabToggle({ onToggle, tabNames }) {
	return (
		<div className="p-1 rounded-full inline-flex mb-8">
			<Tabs defaultValue={tabNames[0]} className="w-full">
				<TabsList className="grid w-full grid-cols-2 bg-[#e1e1e1]">
					<TabsTrigger
						value={tabNames[0]}
						onClick={onToggle}
						className="font-medium"
					>
						{tabNames[0]}
					</TabsTrigger>
					<TabsTrigger
						value={tabNames[1]}
						onClick={onToggle}
						className="font-medium"
					>
						{tabNames[1]}
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
