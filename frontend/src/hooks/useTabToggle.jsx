import { useState } from 'react';

export default function useTabToggle(defaultState = false) {
	const [tabOpen, setTabOpen] = useState(defaultState);
	const [selectedTab, setSelectedTab] = useState('travel');

	const toggle = () => setTabOpen((prev) => !prev);

	return { tabOpen, setTabOpen, toggle, selectedTab, setSelectedTab };
}
