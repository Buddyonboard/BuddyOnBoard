import CarouselFlight from '@/assets/Landing/CarouselFlight.svg';

export default function FlightStopType({ connectionType, connectionLocation }) {
	return (
		<div className="my-4 flex flex-col items-center md:my-0 text-bob-travel-details-color 2xl:text-lg">
			<div className="relative flex w-20 items-center justify-center md:w-32">
				{/* Journey Flight Icon */}
				<div className="flex flex-col items-center mx-2">
					<img
						src={CarouselFlight}
						alt="CarouselFlight"
						className="2xl:w-16 2xl:h-16"
					/>
				</div>
			</div>
			{connectionType}
			{connectionLocation && (
				<div className="text-xs text-bob-travel-details-color">
					{connectionLocation}
				</div>
			)}
		</div>
	);
}
