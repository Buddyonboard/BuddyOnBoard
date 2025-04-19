import { Badge } from '@/components/ui/badge';

export default function LanguageCourierTag({ serviceType, userPreference }) {
	return (
		<div className="flex flex-row items-center gap-2">
			<div className="mt-2">
				<Badge
					variant="outline"
					className="rounded-full bg-bob-language-badge-color text-secondary-color py-1 md:max-lg:w-[170px] max-w-fit md:max-lg:text-[10px]"
				>
					{serviceType === 'Travel Buddy' ? 'Speaks' : 'Prefers'} {userPreference}
				</Badge>
			</div>
		</div>
	);
}
