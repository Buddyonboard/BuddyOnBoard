import ProfileAboutSection from '@/components/BuddyListingInfo/ProfileAbout-Section';
import PricingSection from '@/components/BuddyListingInfo/Pricing-Section';
import {
	getListingByServiceType,
	getMinPricesForCourierItems
} from '@/utils/listingPreferencesHelper';

export default function BuddyListingInfo({ selectedBuddyInfo, serviceType }) {
	/************** Retreive Travel/Courier Listing Type ************/
	const listingType = getListingByServiceType(selectedBuddyInfo, serviceType);

	/************** Retreive Courier each item type starting price ************/
	const minPricesOfCourierItems = getMinPricesForCourierItems(listingType);

	const pricingOptions =
		serviceType === 'Courier Buddy'
			? {
					OPTION_ONE: {
						label: 'DOCUMENTS',
						price: `From $ ${minPricesOfCourierItems?.document}`
					},
					OPTION_TWO: {
						label: 'CLOTHES',
						price: `From $ ${minPricesOfCourierItems?.clothes}`
					},
					OPTION_THREE: {
						label: 'ELECTRONICS',
						price: `From $ ${minPricesOfCourierItems?.electronics}`
					}
			  }
			: {
					OPTION_ONE: {
						label: 'ONE PASSENGER',
						price: `$ ${listingType?.price1}`
					},
					OPTION_TWO: {
						label: 'TWO PASSENGERS',
						price: `$ ${listingType?.price2}`
					},
					OPTION_THREE: {
						label: 'THREE PASSENGERS',
						price: `$ ${listingType?.price3}`
					}
			  };

	return (
		<div className="lg:min-h-screen 2xl:min-h-0 p-4 md:p-2 lg:p-8">
			<div className="mx-auto lg:max-2xl:max-w-6xl">
				{/******* Buddy Type and Travel Info Title *******/}
				<h1 className="mb-6 2xl:text-4xl lg:text-2xl md:text-2xl text-lg font-normal font-merriweather">
					{`${serviceType} from ${listingType?.departureAirport} to ${listingType?.arrivalAirport}`}
				</h1>

				<div className="grid gap-6 md:grid-cols-3 lg:gap-8">
					{/************* Left column - Profile and About *************/}
					<ProfileAboutSection
						pricingOptions={pricingOptions}
						selectedBuddyInfo={selectedBuddyInfo}
						serviceType={serviceType}
					/>

					{/******************* Right column - Pricing *****************/}
					{/*** Visible only for Laptop Screen ***/}
					<PricingSection
						pricingOptions={pricingOptions}
						selectedBuddyInfo={selectedBuddyInfo}
					/>
				</div>
			</div>
		</div>
	);
}
