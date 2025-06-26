import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API_URL from '../../environments/Environment-dev';

const fetchLanguages = async () => {
	const { data } = await axios.get(`${API_URL}/languagesList`);
	return data;
};

export default function useLanguages() {
	return useQuery({
		queryKey: ['languages'],
		queryFn: fetchLanguages,
		staleTime: Infinity
	});
}
