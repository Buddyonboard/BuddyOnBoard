import { useRef } from 'react';
import BuddyCarousel from './BuddyCarousel';
import FeaturesLayout from './FeaturesLayout';
import HeroSection from './HeroSection';
import HowItWorksLayout from './HowItWorksLayout';
import MissionFaqLayout from './MissionFaqLayout';
import FooterSection from '../Layout/FooterSection';

export default function LandingContainer() {
	// Created refs for different sections
	const sectionsRef = {
		'how-it-works': useRef(null)
		// 'about-us': useRef(null)
	};

	// Function to scroll to the selected section
	const scrollToSection = (id) => {
		if (sectionsRef[id] && sectionsRef[id].current) {
			sectionsRef[id].current.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	};

	return (
		<>
			<HeroSection scrollToSection={scrollToSection} />

			{/* Gradient Overlay to blend the bottom into white */}
			{/* Working 1 - Till search bar */}
			<div className="absolute inset-0 lg:bg-gradient-to-b lg:from-transparent lg:to-[#F5F5F5]"></div>

			{/* Working 2 :: Later Reference */}
			{/* <div className="absolute bottom-0 left-0 w-full lg:h-1/2 max-sm:h-1/2 bg-gradient-to-b from-transparent to-bob-bg-color"></div> */}

			<BuddyCarousel />

			<FeaturesLayout />

			<HowItWorksLayout ref={sectionsRef['how-it-works']} />

			<MissionFaqLayout />

			<FooterSection scrollToSection={scrollToSection} />
		</>
	);
}
