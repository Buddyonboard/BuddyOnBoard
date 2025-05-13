import CONST from '@/utils/Constants';

import TabToggle from '../ReUsable/tabToggle';
import useTabToggle from '@/hooks/useTabToggle';
import TravelBuddy from './HowItWorksSection/TravelBuddy';
import CourierBuddy from './HowItWorksSection/CourierBuddy';
import { forwardRef } from 'react';
import CourierBuddyLarge from '@/assets/Landing/HowItWorks/CourierBuddyLarge.svg';
import CourierBuddyMedium from '@/assets/Landing/HowItWorks/CourierBuddyMedium.svg';
import CourierBuddySmall from '@/assets/Landing/HowItWorks/CourierBuddySmall.svg';

const HowItWorksLayout = forwardRef((props, ref) => {
	const { tabOpen, toggle } = useTabToggle();

	return (
		<div ref={ref} className="w-full min-h-screen px-4 py-12 md:px-8 lg:px-16">
			<div className="max-w-7xl mx-auto">
				<div className="text-center">
					<h1 className="text-3xl md:text-4xl font-merriweather font-medium text-bob-tiles-text-color mb-8">
						{CONST.howItWorks}
					</h1>

					{/* Tabs selection */}
					<TabToggle
						onToggle={toggle}
						tabNames={[
							`${CONST.travelBuddy.replace(/^A\s*/, '')}`,
							`${CONST.courierBuddy.replace(/^A\s*/, '')}`
						]}
					/>
				</div>

				{/* Preload image used in CourierBuddy */}
				<img src={CourierBuddyLarge} alt="Preload" style={{ display: 'none' }} />
				<img src={CourierBuddyMedium} alt="Preload" style={{ display: 'none' }} />
				<img src={CourierBuddySmall} alt="Preload" style={{ display: 'none' }} />

				{!tabOpen ? <TravelBuddy /> : <CourierBuddy />}
			</div>
		</div>
	);
});

export default HowItWorksLayout;
