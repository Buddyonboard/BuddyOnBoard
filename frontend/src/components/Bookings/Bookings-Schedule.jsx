import { format, parse } from 'date-fns';

export default function BookingsSchedule({ time, date, location }) {
	// To update date into DD MM, YYYY format
	const formattedDate = format(new Date(date), 'dd MMMM, yyyy');

	// To update time from 24H to 12H format
	let Time = '';

	if (time) {
		try {
			const parsed = parse(time, 'HH:mm', new Date());
			Time = format(parsed, 'hh:mm a').toUpperCase();
		} catch (err) {
			// console.error('Invalid time value:', time, err);
			Time = '';
		}
	}

	return (
		<>
			<div className="text-lg lg:text-xl 2xl:text-2xl font-semibold text-bob-travel-time-color">
				{Time || time}
			</div>
			<div className="text-sm 2xl:text-2xl font-medium text-bob-travel-details-color">
				{formattedDate}
			</div>
			<div className="text-sm 2xl:text-2xl font-medium text-bob-travel-details-color">
				{location}
			</div>
		</>
	);
}
