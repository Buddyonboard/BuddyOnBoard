import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReportIssueCard() {
	return (
		<Link to="/report-issue">
			<Card className="flex flex-col items-center justify-center p-6">
				<AlertCircle className="h-8 w-8 mb-1" />
				<h3 className="2xl:text-2xl text-lg font-semibold mb-1">Report issue</h3>
			</Card>
		</Link>
	);
}
