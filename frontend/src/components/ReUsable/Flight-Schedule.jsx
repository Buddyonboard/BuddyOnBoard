import CarouselFlight from '@/assets/Landing/CarouselFlight.svg';

export default function FlightSchedule({
	departureTime,
	departureDate,
	departureLocation,
	arrivalTime,
	arrivalDate,
	arrivalLocation,
	page
}) {
	return (
		<>
			{/* Departure */}
			<div className="text-left">
				<div
					className={`text-bob-travel-time-color font-bold ${
						page === 'buddy-dashboard' && '2xl:text-2xl'
					}`}
				>
					{departureTime}
				</div>
				<div className="text-xs text-bob-travel-details-color 2xl:text-2xl">
					{departureDate}
				</div>
				<div className="text-xs text-bob-travel-details-color 2xl:text-2xl">
					{departureLocation}
				</div>
			</div>

			{/* Journey Flight Icon */}
			<div className="flex flex-col items-center mx-2">
				<img src={CarouselFlight} alt="CarouselFlight" />
			</div>

			{/* Arrival */}
			<div className="text-right">
				<div className="text-bob-travel-time-color font-bold 2xl:text-2xl">
					{arrivalTime}
				</div>
				<div className="text-xs text-bob-travel-details-color 2xl:text-2xl">
					{arrivalDate}
				</div>
				<div className="text-xs text-bob-travel-details-color 2xl:text-2xl">
					{arrivalLocation}
				</div>
			</div>
		</>
	);
}
