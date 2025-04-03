import HeaderBg from '@/assets/Landing/HeaderBg.svg';
import HeaderSection from '../Layout/HeaderSection';
import SearchSection from './SearchSection';
import BuddyCarousel from './BuddyCarousel';

export default function HeroSection({ scrollToSection }) {
	return (
		<>
			<div
				className="lg:max-h-screen flex flex-col bg-cover bg-center bg-no-repeat p-2 md:p-5 lg:p-8"
				style={{ backgroundImage: `url(${HeaderBg})` }}
			>
				{/******** Navbar Section ********/}
				<HeaderSection scrollToSection={scrollToSection} page="landing" />

				{/******* Search Section *********/}
				<SearchSection />
			</div>

			<div className="hidden md:block absolute bottom-0 left-0 w-full lg:h-1/2 max-sm:h-1/2 bg-gradient-to-b from-transparent to-bob-bg-color"></div>
		</>
	);
}
