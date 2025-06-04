import { Badge } from '@/components/ui/badge';

export default function BuddyRequestTypeTag({ serviceType, productType }) {
	return (
		<div className="flex flex-row items-center gap-2">
			<div className="mt-2">
				<Badge
					variant="outline"
					className={`rounded-full 
						${productType && 'bg-bob-language-badge-color text-secondary-color'} 
						${serviceType && 'bg-bob-color text-primary-color'} 
						py-1 md:max-lg:w-[170px] max-w-fit md:max-lg:text-[10px] 2xl:text-lg`}
				>
					{serviceType || productType}
				</Badge>
			</div>
		</div>
	);
}
