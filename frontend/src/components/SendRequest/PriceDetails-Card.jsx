import { Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip';
import CONST from '@/utils/Constants';
import SendRequestButton from './SendRequest-Button';
import { useMemo } from 'react';

// const platformFees = CONST.sendRequestForm.platformFee;

export default function PriceDetailsCard({
	buddyDetails,
	passengerCount,
	totalWeight,
	formError,
	handleRequestSubmit
}) {
	const buddyPrice = Number(buddyDetails.price.toFixed(2));
	const platformFees = useMemo(() => {
		const fee = buddyPrice;
		return Number((fee * 0.15).toFixed(2));
	}, [buddyPrice]);

	return (
		<div>
			<Card className="overflow-hidden rounded-2xl shadow-xl">
				<CardContent>
					<h2 className="mb-2 2xl:text-3xl text-xl font-semibold text-secondary-color">
						{CONST.sendRequestForm.priceDetails}
					</h2>

					<div className="space-y-4">
						{/******** Total Passenger Count/Approximate Weight *********/}
						<div>
							<p className="2xl:text-xl text-sm text-bob-pricing-block-color font-semibold">
								{buddyDetails.user.type === 'Travel Buddy'
									? CONST.sendRequestForm.totalPassengers
									: CONST.sendRequestForm.approximateWeight}
							</p>
							<p className="2xl:text-2xl text-lg font-medium">
								{buddyDetails.user.type === 'Travel Buddy'
									? passengerCount
									: totalWeight}
							</p>
						</div>

						{/******** Total Passenger Count *********/}
						<div>
							<p className="2xl:text-xl text-sm text-bob-pricing-block-color font-semibold">
								{CONST.sendRequestForm.buddyServiceFee}
							</p>
							<p className="2xl:text-2xl text-lg font-medium">{`$${buddyPrice}`}</p>
						</div>

						{/******** Platform Fees *********/}
						<div>
							<div className="flex items-center gap-1">
								<p
									className="2xl:text-xl text-sm 
                                    text-bob-pricing-block-color font-semibold"
								>
									{CONST.sendRequestForm.platformFees}
								</p>

								{/***** Platform Fees Tooltip *****/}
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Info
												className="size-3.5 2xl:size-5
													text-bob-pricing-block-color"
											/>
										</TooltipTrigger>
										<TooltipContent>
											<p className="max-w-xs 2xl:text-lg text-sm">
												{CONST.sendRequestForm.toolTipText}
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<p className="2xl:text-2xl text-lg font-medium">${platformFees}</p>
						</div>

						{/******** Total Price Before Tax *********/}
						<div>
							<p className="2xl:text-xl text-sm text-bob-pricing-block-color font-semibold">
								{CONST.sendRequestForm.totalPriceBeforeTaxes}
							</p>
							<p className="2xl:text-2xl text-lg font-medium">
								{`$${platformFees + buddyPrice}`}
							</p>
						</div>

						{/******** Send Request Button *********/}
						<SendRequestButton handleRequestSubmit={handleRequestSubmit} />

						{/******** Payment Info *********/}
						<p className="text-center 2xl:text-lg text-sm text-bob-accordion-content-color font-medium">
							{CONST.sendRequestForm.paymentInfo}
						</p>

						{formError && (
							<p className="text-bob-error-color 2xl:text-xl text-sm text-center mb-4 font-normal">
								{formError}
							</p>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
