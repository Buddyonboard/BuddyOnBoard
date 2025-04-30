import VerifiedIcon from '@/assets/Common/VerifiedIcon.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function VerifiedBuddyName({ userName, page }) {
	const navigate = useNavigate();
	const [params] = useSearchParams();

	const handleUserClick = () => {
		const userParams = new URLSearchParams(params);
		userParams.set('selectedUserId', userName);
		navigate(`/search?${userParams.toString()}`);
	};

	return (
		<div>
			<div
				className={`flex items-center gap-2 ${
					page === 'search' && 'cursor-pointer'
				}`}
				onClick={page === 'search' ? handleUserClick : undefined}
			>
				<span className="font-medium">{userName}</span>

				<img src={VerifiedIcon} alt="VerifiedIcon" className="h-6 w-6" />
			</div>
		</div>
	);
}
