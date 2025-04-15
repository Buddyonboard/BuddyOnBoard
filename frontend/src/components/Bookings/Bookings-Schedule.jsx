export default function BookingsSchedule({ time, date, location }) {
	return (
		<>
			<div className="text-xl font-semibold text-bob-travel-time-color">
				{time}
			</div>
			<div className="text-sm font-medium text-bob-travel-details-color">
				{date}
			</div>
			<div className="text-sm font-medium text-bob-travel-details-color">
				{location}
			</div>
		</>
	);
}
