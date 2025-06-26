import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';

export default function ListingPricingHelpAccordion({ serviceType }) {
	return (
		<div className="space-y-4">
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value={1} key={1} className="py-2">
					<AccordionTrigger
						className="data-[state=open]:px-5 data-[state=open]:py-2 data-[state=closed]:p-5 2xl:text-xl sm:text-base text-sm leading-6 hover:no-underline text-bob-accordion-content-color rounded-t-md rounded-b-none 
						data-[state=open]:bg-none data-[state=closed]:rounded-b-md font-semibold font-dm-sans"
					>
						{serviceType === 'travel' &&
							'Need help pricing your listing? View our pricing guide to help set fair pricing based on group size and layovers.'}
						{serviceType === 'courier' &&
							'Need help pricing your listing? View our pricing guide to help set fair pricing based on item type, weight and size.'}
					</AccordionTrigger>
					<AccordionContent className="pl-5 rounded-b-md">
						<div className="flex flex-col gap-5">
							<div className="flex sm:flex-row flex-col sm:gap-10 gap-5">
								{/**** Travelers and Layovers ****/}
								<div className="text-left">
									<h1 className="font-bold text-bob-filters-placeholder-color 2xl:text-xl sm:text-base text-sm">
										Travelers & Layovers
									</h1>
									<div className="text-bob-buddy-listing-accordion-color font-normal 2xl:text-xl sm:text-base text-sm">
										{serviceType === 'travel' && (
											<>
												<p>1 Traveler, 1 stop layover</p>
												<p>2 Travelers, 1 stop layover</p>
												<p>2 Travelers, 2 stop layover</p>
												<p>1 Traveler, 2 stop layover</p>
											</>
										)}
										{serviceType === 'courier' && (
											<>
												<p>{'Documents (< 500 gms)'}</p>
												<p>{'Documents (500 gms - 1KG)'}</p>
												<p>{'Documents (> 1KG)'}</p>
												<p>{'Clothes (< 1KG)'}</p>
												<p>{'Clothes (1KG - 3 KGs)'}</p>
												<p>{'Clothes (> 3 KGs)'}</p>
												<p>{'Electronics (< 1KG)'}</p>
												<p>{'Electronics (1KG - 3 KGs)'}</p>
												<p>{'Electronics (> 3 KGs)'}</p>
											</>
										)}
									</div>
								</div>

								{/**** Recommended Range ****/}
								<div>
									<h1 className="font-bold text-bob-filters-placeholder-color 2xl:text-xl sm:text-base text-sm">
										Recommended Range
									</h1>
									<div className="text-bob-buddy-listing-accordion-color font-normal 2xl:text-xl sm:text-base text-sm">
										{serviceType === 'travel' && (
											<>
												<p>$50 - $70</p>
												<p>$70 - $120</p>
												<p>$60 - $80</p>
												<p>$80 - $130</p>
											</>
										)}
										{serviceType === 'courier' && (
											<>
												<p>$50 - $70</p>
												<p>$90 - $130</p>
												<p>$150 - $200</p>
												<p>$70 - $100</p>
												<p>$100 - $150</p>
												<p>$150 - $250</p>
												<p>$70 - $100</p>
												<p>$100 - $150</p>
												<p>$150 - $250</p>
											</>
										)}
									</div>
								</div>
							</div>

							<div className="text-bob-buddy-listing-accordion-color font-normal 2xl:text-xl sm:text-base text-sm">
								<p>
									These are just recommendations — feel free to adjust based on your
									preference.
								</p>
								<br />
								<p>💡 Offering competitive pricing can help you get more requests!</p>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
