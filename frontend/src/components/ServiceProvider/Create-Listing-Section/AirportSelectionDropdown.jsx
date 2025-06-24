import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../../ui/input';
import API_URL from '../../../../environments/Environment-dev';

export default function AirportSearchDropdown({
	errors,
	onChange,
	setAirportFromSelected,
	setAirportToSelected
}) {
	const [query, setQuery] = useState('');
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
				const fetchSuggestions = async () => {
					try {
						const response = await fetch(`${API_URL}/airportsList?query=${query}`);
						const data = await response.json();

						setFilteredOptions(data);
						setShowDropdown(true);
					} catch (error) {
						// console.error('Error fetching airport suggestions:', error);
					}
				};

				fetchSuggestions();
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

		onChange?.(value); // Set to Form Value
	};

	return (
		<>
			<Input
				type="text"
				ref={inputRef}
				className={`w-full focus-visible:ring-0 shadow-none ${
					errors?.firstName?.type === 'required' && 'border-2 border-bob-error-color'
				}`}
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
								onClick={() =>
									handleSelect(
										`${option.iata_code}, ${option.municipality}, ${option.iso_country}`
									)
								}
								className="px-4 py-2 cursor-pointer hover:bg-gray-100"
							>
								{option.iata_code}, {option.municipality}, {option.country_name}
							</div>
						))
					) : (
						<div className="px-4 py-2 text-bob-search-input-label-color">
							No Airports Found
						</div>
					)}
				</div>
			)}
		</>
	);
}
