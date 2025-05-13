import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';

const items = [
	{
		id: '1',
		title: 'What is Buddy On Board',
		content:
			'Buddy On Board is a platform that connects travelers with trusted companions or courier buddies to make travel stress-free and convenient. Whether you’re seeking a travel buddy or need to send items with a verified traveler, our platform ensures safety, flexibility, and peace of mind.'
	},
	{
		id: '2',
		title: 'How does Buddy On Board ensures user safety?',
		content:
			'All users are verified through a secure identity verification process using government-issued IDs. This ensures that everyone offering Buddy Services on the platform is thoroughly vetted.'
	},
	{
		id: '3',
		title: 'How do I find a travel companion?',
		content:
			'Simply input your travel details, such as destination and dates, and browse verified profiles. Use filters to match with companions based on preferences like language and gender.'
	},
	{
		id: '4',
		title: 'How does the Courier Buddy service work?',
		content:
			"To get started, enter your courier details and search for verified Courier Buddies heading to your destination. You can send requests to multiple buddies at once. Once you find a match, the payment button will be activated in the selected buddy's profile. After completing the payment, you can coordinate directly through our in-app messaging system to finalize the details."
	},
	{
		id: '5',
		title: 'How do I make a payment?',
		content:
			'Payments can be securely processed through our trusted, integrated payment gateway. We accept major credit cards and other popular payment methods. For your security, we do not store any payment information, ensuring the highest level of data protection for our users.'
	},
	{
		id: '6',
		title: 'Can I report a user if I feel unsafe?',
		content:
			'Yes, you can report any user or suspicious activity directly through the platform. We take all reports seriously and will investigate promptly. If necessary, we will escalate the matter to law enforcement authorities to ensure user safety.'
	}
];

export default function FaqAccordion() {
	return (
		<div className="space-y-4">
			<Accordion type="single" collapsible className="w-full">
				{items.map((item) => (
					<AccordionItem value={item.id} key={item.id} className="py-2">
						<AccordionTrigger className="data-[state=open]:px-5 data-[state=open]:py-2 data-[state=closed]:p-5 text-base leading-6 hover:no-underline text-bob-accordion-content-color bg-[#CEDAF3] rounded-t-md rounded-b-none data-[state=open]:bg-bob-accordion-bg-color data-[state=closed]:rounded-b-md font-semibold font-dm-sans">
							{item.title}
						</AccordionTrigger>
						<AccordionContent className="text-[#737070] pl-5 bg-bob-accordion-bg-color rounded-b-md font-normal text-base">
							{item.content}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
