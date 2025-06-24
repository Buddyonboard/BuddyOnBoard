import ListingTypeSelector from './ListingTypeSelector';

import CourierBuddyListingIcon from '@/assets/CreateBuddyListing/CourierBuddyListingIcon.svg';
import TravelBuddyListingIcon from '@/assets/CreateBuddyListing/TravelBuddyListingIcon.svg';
import { Outlet, useLocation } from 'react-router-dom';

export default function CreateListingPage() {
	const location = useLocation();
	const isSubRoute = location.pathname !== '/create-listing';

	return (
		<div className="min-h-screen">
			{!isSubRoute ? (
				/*********** Listing Selection Options ***********/
				<div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
					<div className="mx-auto 2xl:max-w-6xl max-w-3xl">
						{/******** Page Header ********/}
						<div className="mb-4 md:mb-8 w-full">
							<h1 className="text-2xl md:text-3xl 2xl:text-5xl font-normal text-bob-tiles-text-color font-merriweather">
								What kind of listing would you like to create?
							</h1>
						</div>

						{/******** Listing Options ********/}
						<div className="space-y-4">
							<ListingTypeSelector
								icon={TravelBuddyListingIcon}
								title="Travel Buddy"
								description="Want to earn while you travel? Create a listing to help fellow travelers with airport navigation, communication, or companionship. Share your travel plans and receive requests from those who need a helping hand."
								value="Travel Buddy"
								route="travel-buddy-form"
							/>

							<ListingTypeSelector
								icon={CourierBuddyListingIcon}
								title="Courier Buddy"
								description="Willing to carry something on your trip for a fee? Add your travel details to receive package requests from users. Review the item info and documents, then accept and deliver with confidence."
								value="Courier Buddy"
								route="courier-buddy-form"
							/>
						</div>
					</div>
				</div>
			) : (
				/*********** Travel/Courier Listing Creation Form ***********/
				<Outlet />
			)}
		</div>
	);
}
