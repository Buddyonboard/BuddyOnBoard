import { toast } from 'sonner';
import CONST from '@/utils/constants';

export function searchFunction(
	selectedTab,
	airportFromSelected,
	airportToSelected,
	date,
	selectedPackageType
	// navigate
) {
	const isCourier = selectedTab === 'courier';

	if (
		!selectedTab ||
		!airportFromSelected ||
		!airportToSelected ||
		!date ||
		(isCourier && !selectedPackageType)
	) {
		toast.warning(CONST.buddySearch.enterAllFields, {
			position: 'top-right',
			closeButton: true,
			style: {
				backgroundColor: 'red',
				color: 'white'
			}
		});
	} else if (
		airportFromSelected === airportToSelected &&
		airportFromSelected &&
		airportToSelected
	) {
		toast.warning(CONST.buddySearch.fromAndToSameValue, {
			position: 'top-right',
			closeButton: true,
			style: {
				backgroundColor: 'red',
				color: 'white'
			}
		});
	} else {
		const params = new URLSearchParams({
			serviceType: selectedTab,
			from: airportFromSelected,
			to: airportToSelected,
			date: date
		});

		// Add selectedPackageType only for courier
		if (isCourier && selectedPackageType) {
			params.append('packageType', selectedPackageType);
		}

		// navigate(`/search?${params.toString()}`);
		return params;
	}
}
