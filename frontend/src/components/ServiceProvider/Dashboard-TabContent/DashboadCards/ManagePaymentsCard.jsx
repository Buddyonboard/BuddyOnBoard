import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManagePaymentsCard() {
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
				<Button className="bg-bob-color border-2 border-bob-border-color w-full rounded-2xl font-semibold 2xl:text-xl py-5">
					Open Stripe
				</Button>
			</CardContent>
		</Card>
	);
}
