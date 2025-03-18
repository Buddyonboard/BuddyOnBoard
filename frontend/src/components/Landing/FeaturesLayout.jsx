import TravelBuddy from './FeaturesSection/TravelBuddy';
import CourierBuddy from './FeaturesSection/CourierBuddy';

export default function FeaturesLayout() {
	return (
		<>
			<section
				className={`py-16 px-5 lg:p-10 bg-[url(@/assets/Landing/Features/BgFrame.svg)]`}
			>
				<div className="container mx-auto">
					<TravelBuddy />

					<CourierBuddy />
				</div>
			</section>
		</>
	);
}
