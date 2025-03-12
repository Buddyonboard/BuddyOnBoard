import { useState } from 'react';

export default function useTabToggle(defaultState = false) {
	const [tabOpen, setTabOpen] = useState(defaultState);

	const toggle = () => setTabOpen((prev) => !prev);

	return { tabOpen, toggle };
}
