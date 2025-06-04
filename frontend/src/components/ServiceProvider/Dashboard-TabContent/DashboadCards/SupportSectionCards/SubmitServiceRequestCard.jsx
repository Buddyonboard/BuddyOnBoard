import { Card } from '@/components/ui/card';
import { FileUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SubmitServiceRequestCard() {
	return (
		<Link to="/service-request">
			<Card className="flex flex-col items-center justify-center p-6">
				<FileUp className="h-8 w-8 mb-1" />
				<h3 className="2xl:text-2xl text-lg font-semibold mb-1">
					Submit Service request
				</h3>
			</Card>
		</Link>
	);
}
