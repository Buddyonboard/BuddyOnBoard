import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LineSeparator from '@/assets/Common/Line-Separator.svg';
import FlightStopType from '@/components/ReUsable/Service-Seeker/Flight-Stop-Type';
import TripSchedule from '../Dashboard-TabContent/TripSchedule';
import ListingsStatus from './ListingsStatus';
// import ListingsActionButtons from './ListingsActionButtons';

export default function PreviousListingsTabContent({ previousListingsList }) {
	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl py-0 mb-5">
			<div className="flex flex-col md:flex-row items-center md:max-lg:justify-between max-sm:gap-5 lg:my-2.5">
				{/******** Flight Details Section ********/}
				<div className="lg:p-5 md:py-2.5 py-4 lg:pr-10 md:px-0 px-4">
					<div className="flex flex-row md:items-center md:justify-between sm:max-lg:px-5">
						{/**** Departure ****/}
						<div className="text-start">
							<TripSchedule
								time={previousListingsList.departure?.time}
								date={previousListingsList.departure?.date}
								location={previousListingsList.departure?.location}
							/>
						</div>

						{/**** Flight Connection Type ****/}
						<FlightStopType
							connectionType={previousListingsList?.connectionType}
							connectionLocation={previousListingsList?.connectionLocation}
						/>

						{/**** Arrival ****/}
						<div className="text-end">
							<TripSchedule
								time={previousListingsList.arrival?.time}
								date={previousListingsList.arrival?.date}
								location={previousListingsList.arrival?.location}
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
						<span>{previousListingsList?.serviceType}</span>
					</div>
					<div className="mt-3 flex items-center gap-1 rounded-full bg-bob-language-badge-color xl:px-4 px-3 py-1 2xl:text-xl text-xs text-secondary-color w-fit">
						<span>{previousListingsList?.tag}</span>
					</div>
				</div>

				{/**** Vertical Line Separator ****/}
				<img
					className="lg:block hidden w-0.5"
					src={LineSeparator}
					alt="Line Separator"
				/>

				{/********* Actions Buttons **********/}

				{/* <ListingsActionButtons price={previousListingsList.priceStarts} /> */}
				<ListingsStatus previousListingsList={previousListingsList} />
			</div>
		</Card>
	);
}
