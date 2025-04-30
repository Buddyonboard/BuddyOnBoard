import ProfileAboutSection from '@/components/BuddyListingInfo/ProfileAbout-Section';
import PricingSection from '@/components/BuddyListingInfo/Pricing-Section';

export default function BuddyListingInfo() {
	const pricingOptions = {
		ONE_PASSENGER: { label: 'ONE PASSENGER', price: '$42.00' },
		TWO_PASSENGERS: { label: 'TWO PASSENGERS', price: '$75.50' },
		THREE_PASSENGERS: { label: 'THREE PASSENGERS', price: '$90.00' }
	};

	return (
		<div className="lg:min-h-screen p-4 md:p-2 lg:p-8">
			<div className="mx-auto max-w-6xl">
				{/******* Page Title *******/}
				<h1 className="mb-6 lg:text-4xl md:text-3xl text-2xl font-normal font-merriweather">
					Courier Buddy from LAX, USA to YVR, Canada
				</h1>

				<div className="grid gap-6 md:grid-cols-3 lg:gap-8">
					{/************* Left column - Profile and About *************/}
					<ProfileAboutSection pricingOptions={pricingOptions} />

					{/******************* Right column - Pricing *****************/}
					{/*** Visible only for Laptop Screen ***/}
					<PricingSection pricingOptions={pricingOptions} />
				</div>
			</div>
		</div>
	);
}
