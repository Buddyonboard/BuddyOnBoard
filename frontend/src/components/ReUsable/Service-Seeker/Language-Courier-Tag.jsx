import { Badge } from '@/components/ui/badge';

export default function LanguageCourierTag({ serviceType, preferencesList }) {
	return (
		<div className="flex flex-row items-center gap-2">
			<div className="mt-2">
				<Badge
					variant="outline"
					className="rounded-full bg-bob-language-badge-color text-secondary-color py-1 md:max-lg:w-[170px] max-w-fit md:max-lg:text-[10px] 2xl:text-base"
				>
					{serviceType === 'Travel Buddy' ? 'Speaks' : 'Prefers'}
					{preferencesList?.length > 0 && (
						<>
							{preferencesList.map((item, index) => (
								<span key={index}>{item}</span>
							))}
						</>
					)}
				</Badge>
			</div>
		</div>
	);
}
