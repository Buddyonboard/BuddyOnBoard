import CONST from '@/utils/Constants';

import CourierBuddyLarge from '@/assets/Landing/HowItWorks/CourierBuddyLarge.svg';
import CourierBuddyMedium from '@/assets/Landing/HowItWorks/CourierBuddyMedium.svg';
import CourierBuddySmall from '@/assets/Landing/HowItWorks/CourierBuddySmall.svg';

import HandShake from '@/assets/Landing/HowItWorks/Icons/HandShake.svg';
import Location from '@/assets/Landing/HowItWorks/Icons/Location.svg';
import User from '@/assets/Landing/HowItWorks/Icons/User.svg';

import HowItWorksItem from '../HowItWorksSection/HowItWorksItem';

export default function CourierBuddy() {
	return (
		<div className="relative mt-8 md:mt-12">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
				{/* Left side - Image */}
				<div className="relative lg:left-[15%] 2xl:left-[20%]">
					<div className="w-full h-full lg:mb-18 2xl:mb-20">
						<img
							src={CourierBuddyLarge}
							alt="Courier Buddy"
							className="hidden lg:block"
						/>
						<img
							src={CourierBuddyMedium}
							alt="Courier Buddy"
							className="max-sm:hidden lg:hidden w-full"
						/>
						<img src={CourierBuddySmall} alt="Courier Buddy" className="sm:hidden" />
					</div>
				</div>
				{/* Right side - Cards */}
				<div className="space-y-4 md:space-y-6 order-1 lg:order-2 lg:right-[10%] md:z-50">
					<HowItWorksItem
						icon={User}
						title={CONST.findCourierBuddy}
						text={CONST.sharePackageDetails}
					/>
					<HowItWorksItem
						icon={HandShake}
						title={CONST.connectAndConfirm}
						text={CONST.confirmCourierBuddy}
					/>
					<HowItWorksItem
						icon={Location}
						title={CONST.receiveUpdates}
						text={CONST.stayInformedWithUpdates}
					/>
				</div>
			</div>
		</div>
	);
}
