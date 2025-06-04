export default function TripSchedule({ time, date, location }) {
	return (
		<>
			<div className="text-lg 2xl:text-2xl md:text-xl font-semibold text-bob-travel-time-color">
				{time}
			</div>
			<div className="text-sm 2xl:text-2xl font-medium text-bob-travel-details-color">
				{date}
			</div>
			<div className="text-sm 2xl:text-2xl font-medium text-bob-travel-details-color">
				{location}
			</div>
		</>
	);
}
