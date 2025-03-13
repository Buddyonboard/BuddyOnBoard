import FaqAccordion from './FaqAccordion';

import { Button } from '@/components/ui/button';
import CONST from '@/utils/Constants';

export default function FaqSection() {
	return (
		<section className="py-12 md:py-16 px-4">
			<div className="container mx-auto max-w-3xl">
				<h2 className="text-2xl font-semibold mb-8 text-center font-merriweather ">
					{CONST.FAQ[0].someFaq}
				</h2>

				<FaqAccordion />

				<div className="mt-8 text-center">
					<Button className="bg-[#0D53E0] hover:bg-blue-800 text-white rounded-md px-8">
						{CONST.FAQ[0].exploreMoreFaq}
					</Button>
				</div>
			</div>
		</section>
	);
}
