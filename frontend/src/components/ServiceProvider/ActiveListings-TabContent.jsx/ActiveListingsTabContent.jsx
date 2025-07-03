import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LineSeparator from '@/assets/Common/Line-Separator.svg';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import TripSchedule from '../Dashboard-TabContent/TripSchedule';
import ListingsActionButtons from './ListingsActionButtons';

export default function ActiveListingsTabContent({ activeListingsList }) {
	/****** List of Courier/Languages Preferences ******/
	const languagesList = [
		activeListingsList?.language1,
		activeListingsList?.language2,
		activeListingsList?.language3
	].filter((lang) => lang !== undefined && lang !== null && lang !== '');

	const courierItemsList = Array.from(
		new Set(
			(activeListingsList?.courierPreferences || []).map((item) => {
				if (item.toLowerCase().startsWith('electronics')) {
					return 'Electronics';
				}

				return item; // fallback for anything else
			})
		)
	);

	const preferencesList =
		activeListingsList?.serviceType === 'Travel Buddy'
			? languagesList
			: courierItemsList;

	const selectionType =
		activeListingsList?.serviceType === 'Travel Buddy' ? 'Speaks' : 'Prefers';

	/****** Collect lowest starting price fields dynamically ******/
	const prices = [];

	// Add travel buddy prices if present
	if (activeListingsList?.serviceType === 'Travel Buddy') {
		prices.push(
			Number(activeListingsList?.price1 || Infinity),
			Number(activeListingsList?.price2 || Infinity),
			Number(activeListingsList?.price3 || Infinity)
		);
	}

	// Add courier buddy prices if present
	if (activeListingsList?.serviceType === 'Courier Buddy') {
		prices.push(
			Number(activeListingsList?.documentPrice1 || Infinity),
			Number(activeListingsList?.documentPrice2 || Infinity),
			Number(activeListingsList?.documentPrice3 || Infinity),
			Number(activeListingsList?.clothesPrice1 || Infinity),
			Number(activeListingsList?.clothesPrice2 || Infinity),
			Number(activeListingsList?.clothesPrice3 || Infinity),
			Number(activeListingsList?.electronicsPrice1 || Infinity),
			Number(activeListingsList?.electronicsPrice2 || Infinity),
			Number(activeListingsList?.electronicsPrice3 || Infinity)
		);
	}

	// Filter out Infinity (in case of missing fields)
	const validPrices = prices.filter((p) => p !== Infinity);

	// Return min price, or null if no valid price
	const priceStarts = validPrices.length ? Math.min(...validPrices) : null;

	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl py-0 mb-5">
			<div className="flex flex-col md:flex-row items-center md:max-lg:justify-between max-sm:gap-5 lg:my-2.5">
				{/******** Flight Details Section ********/}
				<div className="lg:p-5 md:py-2.5 py-4 lg:pr-10 md:px-0 px-4">
					<div className="flex flex-row md:items-center md:justify-between sm:max-lg:px-5">
						{/**** Departure ****/}
						<div className="text-start">
							<TripSchedule
								time={activeListingsList?.departureTime}
								date={activeListingsList?.departureDate}
								location={activeListingsList?.departureAirport}
							/>
						</div>

						{/**** Flight Connection Type ****/}
						<FlightStopType
							connectionType={activeListingsList?.stops}
							connectionLocation={activeListingsList?.stopAirports}
						/>

						{/**** Arrival ****/}
						<div className="text-end">
							<TripSchedule
								time={activeListingsList?.arrivalTime}
								date={activeListingsList?.arrivalDate}
								location={activeListingsList?.arrivalAirport}
							/>
						</div>
					</div>
				</div>

				{/**** Vertical Line Separator ****/}
				<img
					className="md:block hidden w-0.5 md:max-lg:my-5"
					src={LineSeparator}
					alt="Line Separator"
				/>
				{/**** Horizontal Line Separator ****/}
				<Separator
					className="md:hidden block w-0.5 bg-bob-line-separator-color data-[orientation=horizontal]:w-[90%]"
					orientation="horizontal"
				/>

				{/********** Type of Booking - Travel/Courier **********/}
				<div className="2xl:pl-10 pl-5 pb-5 lg:w-1/3 md:w-1/5 w-full lg:mr-0 md:mr-5">
					<div
						className="mt-3 flex items-center gap-1 rounded-full bg-bob-color
						xl:px-4 px-3 py-1 2xl:text-xl text-xs text-primary-color w-fit"
					>
						<span>{activeListingsList?.serviceType}</span>
					</div>
					<div className="mt-3 flex items-center gap-1 rounded-full bg-bob-language-badge-color xl:px-4 px-3 py-1 2xl:text-xl text-xs text-secondary-color w-fit">
						{selectionType}
						{preferencesList.map((item, index) => (
							<span key={index}>{item}</span>
						))}
					</div>
				</div>

				{/**** Vertical Line Separator ****/}
				<img
					className="lg:block hidden w-0.5"
					src={LineSeparator}
					alt="Line Separator"
				/>

				{/********* Actions Buttons **********/}
				<div className="justify-evenly md:max-lg:items-baseline max-sm:items-center 2xl:gap-8">
					<ListingsActionButtons
						price={priceStarts}
						listing_id={activeListingsList?.listing_id}
						serviceType={activeListingsList?.serviceType}
					/>
				</div>
			</div>
		</Card>
	);
}
