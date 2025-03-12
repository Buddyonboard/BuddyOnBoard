import CONST from '@/utils/Constants';

import TabToggle from '../ReUsable/tabToggle';
import useTabToggle from '@/hooks/useTabToggle';
import TravelBuddy from './HowItWorksSection/TravelBuddy';
import CourierBuddy from './HowItWorksSection/CourierBuddy';

export default function HowItWorksLayout() {
	const { tabOpen, toggle } = useTabToggle();

	return (
		<div className="w-full min-h-screen px-4 py-12 md:px-8 lg:px-16">
			<div className="max-w-7xl mx-auto">
				<div className="text-center">
					<h1 className="text-3xl md:text-4xl font-merriweather font-medium text-[#0A0A0A] mb-8">
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

				{!tabOpen ? <TravelBuddy /> : <CourierBuddy />}
			</div>
		</div>
	);
}
