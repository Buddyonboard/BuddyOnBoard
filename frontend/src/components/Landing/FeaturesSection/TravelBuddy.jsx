import FeatureItem from '@/components/Landing/FeaturesSection/FeatureItem';
import CONST from '@/utils/Constants';

import TravelStressFree from '@/assets/Landing/Features/TravelStressFree.svg';
import TravelStressFreeLarge from '@/assets/Landing/Features/TravelStressFreeLarge.svg';
import TravelStressFreeSmall from '@/assets/Landing/Features/TravelStressFreeSmall.svg';

import User from '@/assets/Landing/Features/Users.svg';
import IdCard from '@/assets/Landing/Features/IdCard.svg';
import Flight from '@/assets/Landing/Features/Flight.svg';

export default function TravelBuddy() {
	return (
		<>
			{/* Layout for screens 768px and above */}
			<div className="hidden lg:grid lg:grid-cols-2 lg:gap-12">
				<div className="flex flex-col justify-center">
					<h2 className="text-2xl md:text-3xl font-medium mb-6 text-[#0A0A0A]">
						{CONST.travelStressFree}
					</h2>
					<div className="space-y-4">
						<FeatureItem icon={User} text={CONST.matchReliableBuddy} size="large" />
						<FeatureItem
							icon={IdCard}
							text={CONST.verifiedTravelBuddy}
							size="large"
						/>
						<FeatureItem icon={Flight} text={CONST.safeJourney} size="large" />
					</div>
				</div>
				<div className="flex justify-center">
					<img src={TravelStressFreeLarge} alt="Travel companions" />
				</div>
			</div>

			{/* Layout for screens between 640px - 768px */}
			<div className="lg:hidden max-sm:hidden flex flex-col items-center justify-center py-12 px-6">
				<h2 className="text-2xl md:text-3xl font-medium w-[70%] text-center">
					{CONST.travelStressFree}
				</h2>
				<div className="flex flex-row">
					{/* Left Section - Image */}
					<div className="relative w-full md:w-1/2 flex justify-center">
						<img
							src={TravelStressFree}
							alt="Travel Stress Free"
							className="w-full md:w-[100%] max-w-[450px]"
						/>
					</div>
					{/* Right Section - Text & Features */}
					<div className="relative w-full md:w-1/2 mt-10 md:mt-0 px-4 z-50 right-[5%] top-4">
						<div className="mt-6 space-y-4">
							<FeatureItem icon={User} text={CONST.matchReliableBuddy} size="medium" />
							<FeatureItem
								icon={IdCard}
								text={CONST.verifiedTravelBuddy}
								size="medium"
							/>
							<FeatureItem icon={Flight} text={CONST.safeJourney} size="medium" />
						</div>
					</div>
				</div>
			</div>

			{/* Layout for Mobile screens */}
			<div className="sm:hidden flex flex-col items-center">
				<h2 className="text-[22px] font-medium w-full text-center mb-4">
					{CONST.travelStressFree}
				</h2>
				<img src={TravelStressFreeSmall} alt="TravelBuddyMobileView" />
			</div>
		</>
	);
}
