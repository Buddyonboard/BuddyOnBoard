import axios from 'axios';
import API_URL from '../../environments/Environment-dev';
import { useState } from 'react';

function useSearchBuddyListings() {
	const [results, setResults] = useState({
		exactMatches: [],
		flexibleDateMatches: []
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const search = async (params) => {
		setLoading(true);
		setError(null);
		try {
			const response = await axios.get(`${API_URL}/search-buddy-listings`, {
				params
			});

			setResults(response.data.data);
		} catch (err) {
			// console.error(err);
			setError('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return { results, loading, error, search };
}

export default useSearchBuddyListings;
