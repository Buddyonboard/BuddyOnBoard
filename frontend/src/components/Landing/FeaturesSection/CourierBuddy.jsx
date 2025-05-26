import FeatureItem from '@/components/Landing/FeaturesSection/FeatureItem';
import CONST from '@/utils/Constants';

import CourierEasilyMedium from '@/assets/Landing/Features/CourierEasilyMedium.svg';
import CourierEasilyLarge from '@/assets/Landing/Features/CourierEasilyLarge.svg';
import CourierEasilySmall from '@/assets/Landing/Features/CourierEasilySmall.svg';

import ConnectUser from '@/assets/Landing/Features/ConnectUser.svg';
import Package from '@/assets/Landing/Features/Package.svg';
import Tick from '@/assets/Landing/Features/Tick.svg';

export default function CourierBuddy() {
	return (
		<>
			{/* Layout for screens 768px and above */}
			<div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:mt-20">
				<div className="flex justify-center">
					<img src={CourierEasilyLarge} alt="Courier buddies" />
				</div>
				<div className="flex flex-col justify-center">
					<h2 className="text-2xl md:text-3xl font-medium mb-6">
						{CONST.shipmentsMadeEasy}
					</h2>
					<div className="space-y-4">
						<FeatureItem
							icon={ConnectUser}
							text={CONST.verifiedCourierBuddy}
							size="large"
						/>
						<FeatureItem
							icon={Package}
							text={CONST.stayUpdatedAboutDelivery}
							size="large"
						/>
						<FeatureItem icon={Tick} text={CONST.costEffectiveCourier} size="large" />
					</div>
				</div>
			</div>

			{/* Layout for screens between 640px - 768px */}
			<div className="lg:hidden max-sm:hidden flex flex-col items-center justify-center py-12 px-6">
				<h2 className="text-2xl md:text-3xl font-medium w-[70%] text-center">
					{CONST.shipmentsMadeEasy}
				</h2>
				<div className="flex flex-row">
					{/* Left Section - Text & Features */}
					<div className="relative w-full md:w-1/2 mt-10 md:mt-0 px-4 z-50 left-[5%] top-4">
						<div className="mt-6 space-y-4">
							<div className="space-y-4">
								<FeatureItem
									icon={ConnectUser}
									text={CONST.verifiedCourierBuddy}
									size="medium"
								/>
								<FeatureItem
									icon={Package}
									text={CONST.stayUpdatedAboutDelivery}
									size="medium"
								/>
								<FeatureItem
									icon={Tick}
									text={CONST.costEffectiveCourier}
									size="medium"
								/>
							</div>
						</div>
					</div>
					{/* Right Section - Image */}
					<div className="relative w-full md:w-1/2 flex justify-center">
						<img
							src={CourierEasilyMedium}
							alt="Courier buddies"
							className="w-full md:w-[100%] max-w-[450px]"
						/>
					</div>
				</div>
			</div>

			{/* Layout for Mobile screens */}
			<div className="sm:hidden flex flex-col items-center mt-20">
				<h2 className="text-[22px] font-medium w-full text-center mb-4">
					{CONST.shipmentsMadeEasy}
				</h2>
				<img src={CourierEasilySmall} alt="CourierEasilySmall" />
			</div>
		</>
	);
}
