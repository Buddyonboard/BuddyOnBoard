import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API_URL from '../../environments/Environment-dev';

const fetchCountries = async () => {
	const { data } = await axios.get(`${API_URL}/countriesList`);
	return data;
};

export default function useCountries() {
	return useQuery({
		queryKey: ['countries'],
		queryFn: fetchCountries,
		staleTime: Infinity
	});
}
