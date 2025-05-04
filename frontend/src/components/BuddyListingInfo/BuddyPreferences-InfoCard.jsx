import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import GenderIcon from '@/assets/SearchListing/GenderIcon.svg';
import HandShake from '@/assets/SearchListing/HandShake.svg';
import HumanIcon from '@/assets/SearchListing/HumanIcon.svg';

export default function BuddyPreferencesInfoCard() {
	return (
		<Card className="mb-6 overflow-hidden py-0 shadow-xl rounded-2xl">
			<CardContent className="p-0">
				{/****** About Section ******/}
				<div className="p-4 md:p-6">
					<h3 className="mb-3 2xl:text-2xl text-base font-bold">About</h3>
					<p className="text-gray-700 2xl:text-2xl">
						Hi, I’m Sarah T., an experienced traveler who loves making journeys
						smoother and more enjoyable. Whether you're flying for business or
						adventure, I can help with navigation, local insights, or just good
						company along the way.
					</p>
				</div>

				<Separator className="bg-bob-line-separator-color data-[orientation=horizontal]:h-0.5" />

				{/****** Preferences Section ******/}
				<div className="p-4 md:p-6">
					<h3 className="mb-4 2xl:text-2xl text-base font-bold">Preferences</h3>
					<div className="space-y-3">
						{/*** Can Help With ***/}
						<div className="flex items-center gap-3">
							<img src={HandShake} alt="HandShake" />
							<span className="text-bob-form-label-color font-normal 2xl:text-2xl">
								Can help with check-in, security, boarding, and luggage
							</span>
						</div>

						{/*** Languages ***/}
						<div className="flex items-center gap-3">
							<img src={HumanIcon} alt="HumanIcon" />
							<span className="text-bob-form-label-color font-normal 2xl:text-2xl">
								Speaks English, Hindi, Tamil
							</span>
						</div>

						{/*** Gender Preference ***/}
						<div className="flex items-center gap-3">
							<img src={GenderIcon} alt="GenderIcon" />
							<span className="text-bob-form-label-color font-normal 2xl:text-2xl">
								Comfortable accompanying only Female Travelers
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
