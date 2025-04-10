import CarouselFlight from '@/assets/Landing/CarouselFlight.svg';

export default function FlightSchedule({
	departureTime,
	departureDate,
	departureLocation,
	arrivalTime,
	arrivalDate,
	arrivalLocation
}) {
	return (
		<>
			{/* Departure */}
			<div className="text-left">
				<div className="text-bob-travel-time-color font-bold">{departureTime}</div>
				<div className="text-xs text-bob-travel-details-color">{departureDate}</div>
				<div className="text-xs text-bob-travel-details-color">
					{departureLocation}
				</div>
			</div>

			{/* Journey Flight Icon */}
			<div className="flex flex-col items-center mx-2">
				<img src={CarouselFlight} alt="CarouselFlight" />
			</div>

			{/* Arrival */}
			<div className="text-right">
				<div className="text-bob-travel-time-color font-bold">{arrivalTime}</div>
				<div className="text-xs text-bob-travel-details-color">{arrivalDate}</div>
				<div className="text-xs text-bob-travel-details-color">
					{arrivalLocation}
				</div>
			</div>
		</>
	);
}
