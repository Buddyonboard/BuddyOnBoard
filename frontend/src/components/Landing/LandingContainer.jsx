import BuddyCarousel from './BuddyCarousel';
import FeaturesLayout from './FeaturesLayout';
import HeroSection from './HeroSection';
import HowItWorksLayout from './HowItWorksLayout';
import MissionFaqLayout from './MissionFaqLayout';

export default function LandingContainer() {
	return (
		<>
			<HeroSection />

			{/* Gradient Overlay to blend the bottom into white */}
			{/* <div className="absolute inset-0 lg:bg-gradient-to-b lg:from-transparent lg:to-[#F5F5F5]"></div> */}

			<BuddyCarousel />

			<FeaturesLayout />

			<HowItWorksLayout />

			<MissionFaqLayout />
		</>
	);
}
