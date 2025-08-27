import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import API_URL from '../../../../../environments/Environment-dev';
import { showErrorToast } from '@/utils/toastUtils';
import { getSeekerId } from '@/utils/localStorageHelper';
import { useState } from 'react';

export default function ManagePaymentsCard() {
	const [loading, setLoading] = useState(false);

	const handleOpenStripe = async () => {
		const providerId = getSeekerId();

		try {
			setLoading(true);
			const res = await axios.post(`${API_URL}/open-stripe`, {
				providerId
			});
			window.location.href = res.data.url; // redirect to Stripe
		} catch (err) {
			// console.error(err);
			showErrorToast('Failed to redirect to Stripe');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="gap-3">
			<CardHeader>
				<CardTitle className="font-semibold 2xl:text-2xl md:text-xl">
					Manage Payments
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm 2xl:text-xl text-bob-outline-color font-medium mb-3">
					View and manage your earnings through Stripe.
				</p>
				<Button
					className="bg-bob-color border-2 border-bob-border-color w-full rounded-2xl font-semibold 2xl:text-xl py-5"
					onClick={handleOpenStripe}
					disabled={loading}
				>
					{loading ? 'Opening Stripe....' : 'Open Stripe'}
				</Button>
			</CardContent>
		</Card>
	);
}
