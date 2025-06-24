import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';

export default function ListingPricingHelpAccordion() {
	return (
		<div className="space-y-4">
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value={1} key={1} className="py-2">
					<AccordionTrigger
						className="data-[state=open]:px-5 data-[state=open]:py-2 data-[state=closed]:p-5 2xl:text-xl sm:text-base text-sm leading-6 hover:no-underline text-bob-accordion-content-color rounded-t-md rounded-b-none 
						data-[state=open]:bg-none data-[state=closed]:rounded-b-md font-semibold font-dm-sans"
					>
						Need help pricing your listing? View our pricing guide to help set fair
						pricing based on group size and layovers.
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
										<p>1 Traveler, 1 stop layover</p>
										<p>2 Travelers, 1 stop layover</p>
										<p>2 Travelers, 2 stop layover</p>
										<p>1 Traveler, 2 stop layover</p>
									</div>
								</div>

								{/**** Recommended Range ****/}
								<div>
									<h1 className="font-bold text-bob-filters-placeholder-color 2xl:text-xl sm:text-base text-sm">
										Recommended Range
									</h1>
									<div className="text-bob-buddy-listing-accordion-color font-normal 2xl:text-xl sm:text-base text-sm">
										<p>$50-$70</p>
										<p>$70-$120</p>
										<p>$60-$80</p>
										<p>$80-$130</p>
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
