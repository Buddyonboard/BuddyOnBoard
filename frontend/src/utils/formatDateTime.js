import { format, parse } from 'date-fns';

/************ Formats a date and time into human-readable formats ***********/
export function formatDateTime(date, time) {
	let formattedDate = '';
	let formattedTime = '';

	// Format date to 'DD MMMM, YYYY'
	if (date) {
		try {
			formattedDate = format(new Date(date), 'dd MMMM, yyyy');
		} catch {
			formattedDate = '';
		}
	}

	// Format time to 'hh:mm AM/PM'
	if (time) {
		try {
			const parsed = parse(time, 'HH:mm', new Date());
			formattedTime = format(parsed, 'hh:mm a').toUpperCase();
		} catch {
			formattedTime = '';
		}
	}

	return { formattedDate, formattedTime };
}
