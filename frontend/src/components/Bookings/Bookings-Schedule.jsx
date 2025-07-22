import { formatDateTime } from '@/utils/formatDateTime';
import { format, parse } from 'date-fns';

export default function BookingsSchedule({ time, date, location }) {
	/*************** To Get Formatted Date and Time ***************/
	const { formattedDate, formattedTime } = formatDateTime(date, time);

	return (
		<>
			<div className="text-lg lg:text-xl 2xl:text-2xl font-semibold text-bob-travel-time-color">
				{formattedTime || time}
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
