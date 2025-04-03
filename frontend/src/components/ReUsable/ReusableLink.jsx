import { Link } from 'react-router-dom';

export default function ReusableLink({ to, className, linkName }) {
	return (
		<Link to={to} className={className}>
			{linkName}
		</Link>
	);
}
