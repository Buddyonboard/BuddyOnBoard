import CONST from '@/utils/Constants';

import TravelBuddyLarge from '@/assets/Landing/HowItWorks/TravelBuddyLarge.svg';
import TravelBuddyMedium from '@/assets/Landing/HowItWorks/TravelBuddyMedium.svg';
import TravelBuddySmall from '@/assets/Landing/HowItWorks/TravelBuddySmall.svg';

import Flight from '@/assets/Landing/HowItWorks/Icons/Flight.svg';
import HandShake from '@/assets/Landing/HowItWorks/Icons/HandShake.svg';
import Location from '@/assets/Landing/HowItWorks/Icons/Location.svg';

import HowItWorksItem from '../HowItWorksSection/HowItWorksItem';

export default function TravelBuddy() {
	return (
		<div className="relative mt-8 md:mt-12">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
				{/* Left side - Image */}
				<div className="relative lg:left-[15%] 2xl:left-[20%]">
					<div className="w-full h-full lg:mb-14">
						<img
							src={TravelBuddyLarge}
							alt="Travel Buddy"
							className="hidden lg:block"
						/>
						<img
							src={TravelBuddyMedium}
							alt="Travel Buddy"
							className="max-sm:hidden lg:hidden w-full"
						/>
						<img src={TravelBuddySmall} alt="Travel Buddy" className="sm:hidden" />
					</div>
				</div>
				{/* Right side - Cards */}
				<div className="space-y-4 md:space-y-6 order-1 lg:order-2 lg:right-[10%] z-50">
					<HowItWorksItem
						icon={Flight}
						title={CONST.planYourJourney}
						text={CONST.enterTravelDetails}
					/>
					<HowItWorksItem
						icon={HandShake}
						title={CONST.matchAndConnect}
						text={CONST.browseVerifiedProfiles}
					/>
					<HowItWorksItem
						icon={Location}
						title={CONST.travelTogether}
						text={CONST.meetYourCompanion}
					/>
				</div>
			</div>
		</div>
	);
}
