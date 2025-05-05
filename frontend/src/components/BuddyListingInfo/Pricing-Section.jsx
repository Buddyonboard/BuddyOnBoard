import { Card, CardContent } from '@/components/ui/card';
import SendRequestButton from './SendRequest-Button';

export default function PricingSection({
	pricingOptions,
	screenType,
	selectedBuddyInfo
}) {
	return (
		<div
			className={`md:col-span-1 ${
				screenType === 'tabletMobile' ? 'lg:hidden block' : 'lg:block hidden'
			}`}
		>
			<Card className="sticky top-6 rounded-2xl shadow-xl py-0">
				<CardContent className="p-4">
					{Object.entries(pricingOptions).map(([key, option]) => (
						<div key={key} className="cursor-pointer rounded-lg p-2">
							<div className="text-sm 2xl:text-2xl font-semibold text-bob-pricing-block-color">
								{option.label}
							</div>
							<div className="text-xl 2xl:text-2xl font-medium text-bob-accordion-content-color">
								{option.price}
							</div>
						</div>
					))}

					{/**** Send Request Button ****/}
					<SendRequestButton selectedBuddyInfo={selectedBuddyInfo} />
				</CardContent>
			</Card>
		</div>
	);
}
