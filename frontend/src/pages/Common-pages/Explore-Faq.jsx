import TabToggle from '@/components/ReUsable/tabToggle';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useTabToggle from '@/hooks/useTabToggle';
import CONST from '@/utils/Constants';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import InfoIcon from '@/assets/Explore-Faq-Icons/InfoIcon.svg';
import UploadIcon from '@/assets/Explore-Faq-Icons/UploadIcon.svg';
import { useEffect, useState } from 'react';

const generalFaq = [...CONST.FAQ[0].generalPlatformFaq];
const buddyFaq = [...CONST.FAQ[0].buddiesFaq];

export default function ExploreFaq() {
	const { tabOpen, toggle } = useTabToggle();
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');

	const faqData = tabOpen ? buddyFaq : generalFaq;

	// Debounce effect: Updates `debouncedQuery` after 300ms of inactivity
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query);
		}, 300);

		return () => clearTimeout(handler);
	}, [query]);

	// Filter names based on the search query
	const filteredText = faqData.filter((name) =>
		name.title.toLowerCase().includes(debouncedQuery.toLowerCase())
	);

	return (
		<>
			<div className="container mx-auto md:px-4 px-2 py-6 md:py-8">
				{/* Header Section */}
				<div className="mb-8 md:mb-12 flex md:flex-row flex-col justify-between gap-4">
					<div className="flex flex-col">
						{/* Page Title */}
						<h1 className="text-xl md:text-4xl lg:text-[42px] font-normal mb-6 font-merriweather">
							{CONST.FAQ[1].howCanWeHelpYou}
						</h1>

						{/* Search Bar */}
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CFCFCF] h-4 w-4" />
							<Input
								type="text"
								placeholder="Search your concern"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								className="pl-10 w-full max-w-md bg-white border-[#D5D7DA] border-[1px]"
							/>
						</div>
					</div>

					{/* Action Cards */}
					<div className="grid grid-cols-2 gap-4 items-center">
						<Link to="/report-issue">
							<Card className="hover:shadow-xl shadow-md transition-shadow py-4 md:max-lg:pt-11 md:max-lg:pb-11">
								<CardContent className="flex md:flex-col flex-row md:items-start items-center md:gap-4 gap-2 max-sm:p-0 max-sm:pl-1">
									<div className="rounded-full">
										<img src={InfoIcon} alt="Info Icon" />
									</div>
									<h2 className="md:text-xl text-sm font-semibold">
										{CONST.FAQ[1].reportIssue}
									</h2>
								</CardContent>
							</Card>
						</Link>

						<Link to="/service-request">
							<Card className="hover:shadow-xl shadow-md transition-shadow py-4">
								<CardContent className="flex md:flex-col flex-row md:items-start items-center md:gap-4 gap-2 max-sm:p-0 max-sm:pl-1">
									<div className="rounded-full">
										<img src={UploadIcon} alt="Upload Icon" />
									</div>
									<h2 className="md:text-xl text-sm font-semibold">
										{CONST.FAQ[1].submitServiceRequest}
									</h2>
								</CardContent>
							</Card>
						</Link>
					</div>
				</div>

				{/* FAQ Tabs */}
				<TabToggle
					onToggle={toggle}
					tabNames={['General FAQs', 'FAQs for buddies']}
				/>
			</div>

			{/* FAQ Accordions */}
			<div className="space-y-4 px-4">
				{filteredText.length > 0 ? (
					<Accordion type="single" collapsible className="w-full">
						{filteredText.map((item, index) => (
							<AccordionItem value={index + 1} key={index + 1} className="py-2">
								<AccordionTrigger className="data-[state=open]:px-5 data-[state=open]:py-2 data-[state=closed]:p-5 text-base leading-6 hover:no-underline text-bob-accordion-content-color bg-[#CEDAF3] rounded-t-md rounded-b-none data-[state=open]:bg-bob-accordion-bg-color data-[state=closed]:rounded-b-md font-semibold font-dm-sans">
									{item.title}
								</AccordionTrigger>
								<AccordionContent className="text-[#737070] pl-5 bg-bob-accordion-bg-color rounded-b-md font-normal text-base">
									{item.description}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				) : (
					<div className="p-1">No results found</div>
				)}
			</div>
		</>
	);
}
