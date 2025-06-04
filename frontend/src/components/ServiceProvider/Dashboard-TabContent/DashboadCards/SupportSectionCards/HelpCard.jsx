import { Card } from '@/components/ui/card';
import { CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HelpCard() {
	return (
		<Link to="/explore-faqs">
			<Card className="flex flex-col items-center justify-center p-6">
				<CircleHelp className="h-8 w-8 mb-1" />
				<h3 className="2xl:text-2xl text-lg font-semibold mb-1">Help</h3>
			</Card>
		</Link>
	);
}
