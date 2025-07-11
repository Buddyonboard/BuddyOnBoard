import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import GenderIcon from '@/assets/SearchListing/GenderIcon.svg';
import HandShake from '@/assets/SearchListing/HandShake.svg';
import HumanIcon from '@/assets/SearchListing/HumanIcon.svg';
import {
	getListingByServiceType,
	getPreferencesList
} from '@/utils/listingPreferencesHelper';

export default function BuddyPreferencesInfoCard({
	selectedBuddyInfo,
	serviceType
}) {
	/************** Retreive Travel/Courier Listing Type ************/
	const listingType = getListingByServiceType(selectedBuddyInfo, serviceType);

	/****** List of Courier/Languages Preferences ******/
	const preferencesList = getPreferencesList(listingType, serviceType);

	return (
		<Card className="mb-6 overflow-hidden py-0 shadow-xl rounded-2xl">
			<CardContent className="p-0">
				{/****************** About Section ******************/}
				{listingType?.description !== '' && (
					<>
						<div className="p-4 md:p-6">
							<h3 className="mb-3 2xl:text-2xl text-base font-bold">About</h3>
							<p className="text-gray-700 2xl:text-2xl">{listingType?.description}</p>
						</div>

						<Separator className="bg-bob-line-separator-color data-[orientation=horizontal]:h-0.5" />
					</>
				)}

				{/****************** Preferences Section *****************/}
				{serviceType === 'Travel Buddy' && (
					<div className="p-4 md:p-6">
						<h3 className="mb-4 2xl:text-2xl text-base font-bold">Preferences</h3>
						<div className="space-y-3">
							{/*** Can Help With ***/}
							<div className="flex items-center gap-3">
								<img src={HandShake} alt="HandShake" />
								<span className="text-bob-form-label-color font-normal 2xl:text-2xl">
									Can help with {listingType?.travelAssitanceOptions?.join(', ')}
								</span>
							</div>

							{/*** Languages ***/}
							<div className="flex items-center gap-3">
								<img src={HumanIcon} alt="HumanIcon" />
								<span className="text-bob-form-label-color font-normal 2xl:text-2xl">
									Speaks {preferencesList?.join(', ')}
								</span>
							</div>

							{/*** Gender Preference ***/}
							<div className="flex items-center gap-3">
								<img src={GenderIcon} alt="GenderIcon" />
								<span className="text-bob-form-label-color font-normal 2xl:text-2xl">
									Comfortable accompanying{' '}
									{listingType?.companionPreference !== 'no-preference'
										? `only ${listingType?.companionPreference} travelers`
										: 'anyone'}
								</span>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
