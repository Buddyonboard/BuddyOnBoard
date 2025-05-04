import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip';
import CONST from '@/utils/Constants';

const platformFees = CONST.sendRequestForm.platformFee;

export default function PriceDetailsCard({ buddyDetails, passengerCount }) {
	return (
		<div>
			<Card className="overflow-hidden rounded-2xl shadow-xl">
				<CardContent>
					<h2 className="mb-2 2xl:text-3xl text-xl font-semibold text-secondary-color">
						{CONST.sendRequestForm.priceDetails}
					</h2>

					<div className="space-y-4">
						{/******** Total Passenger Count *********/}
						<div>
							<p className="2xl:text-xl text-sm text-bob-pricing-block-color font-semibold">
								{CONST.sendRequestForm.totalPassengers}
							</p>
							<p className="2xl:text-2xl text-lg font-medium">{passengerCount}</p>
						</div>

						{/******** Total Passenger Count *********/}
						<div>
							<p className="2xl:text-xl text-sm text-bob-pricing-block-color font-semibold">
								{CONST.sendRequestForm.buddyServiceFee}
							</p>
							<p className="2xl:text-2xl text-lg font-medium">${buddyDetails.price}</p>
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
								${platformFees + buddyDetails.price}
							</p>
						</div>

						{/******** Send Request Button *********/}
						<Button
							className="w-full bg-bob-color border-2 
                        border-bob-border-color rounded-2xl 2xl:text-2xl text-xl 
                        max-sm:text-sm max-sm:py-2 py-5 font-semibold cursor-pointer"
						>
							{CONST.buddySearch.sendRequest.name}
						</Button>

						{/******** Payment Info *********/}
						<p className="text-center 2xl:text-lg text-sm text-bob-accordion-content-color font-medium">
							{CONST.sendRequestForm.paymentInfo}
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
