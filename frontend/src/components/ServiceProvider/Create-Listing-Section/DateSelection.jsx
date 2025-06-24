import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

/* Years for Date Picker - from Current Year to +1 Year */
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 2 }, (_, i) => currentYear + i);

/* Utility to generate months based on selected year */
const getMonthsForYear = (selectedYear) => {
	const isCurrentYear = selectedYear === currentYear;
	const startMonthIndex = isCurrentYear ? new Date().getMonth() : 0;

	return Array.from({ length: 12 - startMonthIndex }, (_, i) => ({
		label: format(new Date(selectedYear, startMonthIndex + i, 1), 'MMMM'),
		value: startMonthIndex + i
	}));
};

export default function DateSelection({ setDate, date }) {
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth());

	// Dynamically get available months when year changes
	const months = useMemo(() => getMonthsForYear(year), [year]);

	const handleMonthChange = (value) => {
		setMonth(parseInt(value));
	};

	const handleYearChange = (value) => {
		const newYear = parseInt(value);
		setYear(newYear);

		const updatedMonths = getMonthsForYear(newYear);
		// If the current month index is not in new month's options, update it
		const validMonth = updatedMonths.find((m) => m.value === month);
		if (!validMonth) {
			setMonth(updatedMonths[0].value);
		}
	};

	return (
		<div className="flex flex-col">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="bob"
						className="w-full border-0 outline-none focus-visible:ring-0 shadow-none justify-start"
					>
						{date ? (
							format(date, 'dd/MM/yyyy')
						) : (
							<span className="text-bob-text-placeholder-color">Choose a date</span>
						)}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-auto p-3">
					{/* Month & Year Selectors */}
					<div className="flex gap-2 justify-center mb-2">
						<Select value={month.toString()} onValueChange={handleMonthChange}>
							<SelectTrigger className="w-[120px]">
								<SelectValue placeholder="Month" />
							</SelectTrigger>
							<SelectContent>
								{months.map((m) => (
									<SelectItem key={m.value} value={m.value.toString()}>
										{m.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select value={year.toString()} onValueChange={handleYearChange}>
							<SelectTrigger className="w-[100px]">
								<SelectValue placeholder="Year" />
							</SelectTrigger>
							<SelectContent>
								{years.map((y) => (
									<SelectItem key={y} value={y.toString()}>
										{y}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Calendar */}
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						month={new Date(year, month)}
						className="rdp-month"
						fromDate={new Date()} // Prevent selecting past dates
						disabled={(date) => date < new Date().setHours(0, 0, 0, 0)} // disables previous dates selection
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
