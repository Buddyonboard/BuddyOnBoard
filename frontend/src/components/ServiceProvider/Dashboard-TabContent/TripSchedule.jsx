import { formatDateTime } from '@/utils/formatDateTime';

export default function TripSchedule({ time, date, location }) {
	/*************** To Get Formatted Date and Time ***************/
	const { formattedDate, formattedTime } = formatDateTime(date, time);

	return (
		<>
			<div className="text-lg lg:text-xl 2xl:text-2xl font-semibold text-bob-travel-time-color">
				{formattedTime || time}
			</div>

			<div className="text-sm lg:text-base 2xl:text-2xl font-semibold text-bob-travel-details-color lg:max-w-[110px] 2xl:max-w-[150px]">
				{formattedDate}
			</div>

			<div className="text-sm lg:text-base 2xl:text-lg font-medium text-bob-travel-details-color lg:max-w-[110px] 2xl:max-w-[150px]">
				{location}
			</div>
		</>
	);
}
