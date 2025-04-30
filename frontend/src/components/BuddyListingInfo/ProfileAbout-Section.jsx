import BuddyProfileInfoCard from './BuddyProfile-InfoCard';
import BuddyPreferencesInfoCard from './BuddyPreferences-InfoCard';
import PricingSection from './Pricing-Section';

export default function ProfileAboutSection({ pricingOptions }) {
	return (
		<div className="lg:col-span-2 col-span-3">
			{/********** Buddy Profile Info *********/}
			<BuddyProfileInfoCard />

			<div className="max-lg:grid max-lg:grid-cols-2 max-lg:gap-5 max-sm:grid-cols-1 max-sm:gap-0">
				{/********** Buddy About and Preferences *********/}
				<BuddyPreferencesInfoCard />

				{/**** Visible only for Tablet/Mobile Screen ****/}
				<PricingSection pricingOptions={pricingOptions} screenType="tabletMobile" />
			</div>
		</div>
	);
}
