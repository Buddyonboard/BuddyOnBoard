import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../../ui/input';

const airportOptions = [
	'Newark Liberty International Airport (EWR)',
	'New York John F. Kennedy International Airport (JFK)',
	'New York LaGuardia Airport (LGA)',
	'Dubai Airport (DBX)',
	'Paris Airport (PAX)',
	'Delhi Airport (DEL)'
];

export default function AirportSearch({
	setAirportFromSelected,
	setAirportToSelected,
	searchFieldValue
}) {
	const [query, setQuery] = useState(searchFieldValue || '');
	const [justSelected, setJustSelected] = useState(false);
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const [isTyping, setIsTyping] = useState(false); // Track if user typed
	const inputRef = useRef(null);

	useEffect(() => {
		if (justSelected) {
			setJustSelected(false);
			return;
		}

		if (!isTyping || query.trim() === '') {
			setShowDropdown(false);
		} else {
			const handler = setTimeout(() => {
				const filtered = airportOptions.filter((option) =>
					option.toLowerCase().includes(query.toLowerCase())
				);
				setFilteredOptions(filtered);
				setShowDropdown(true);
			}, 300);

			return () => clearTimeout(handler);
		}
	}, [query, isTyping]);

	const handleSelect = (value) => {
		setQuery(value);
		setShowDropdown(false);
		setJustSelected(true);
		inputRef.current?.focus();

		if (setAirportFromSelected) setAirportFromSelected(value);
		if (setAirportToSelected) setAirportToSelected(value);
	};

	return (
		<>
			<Input
				type="text"
				ref={inputRef}
				className="w-full border-0 outline-none border-none focus-visible:ring-0 shadow-none"
				placeholder="Add an airport"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					setIsTyping(true);
				}}
			/>
			{showDropdown && (
				<div className="absolute z-10 w-fit mt-1 bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto text-xs">
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option, index) => (
							<div
								key={index}
								onClick={() => handleSelect(option)}
								className="px-4 py-2 cursor-pointer hover:bg-gray-100"
							>
								{option}
							</div>
						))
					) : (
						<div className="px-4 py-2 text-gray-500">No airports found</div>
					)}
				</div>
			)}
		</>
	);
}
