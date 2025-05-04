import VerifiedIcon from '@/assets/Common/VerifiedIcon.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function VerifiedBuddyName({ userName, userId, page }) {
	const navigate = useNavigate();
	const [params] = useSearchParams();

	const handleUserClick = () => {
		const userParams = new URLSearchParams(params);
		userParams.set('selectedUserId', userId);
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
				<span className="font-medium 2xl:text-2xl">{userName}</span>

				<img
					src={VerifiedIcon}
					alt="VerifiedIcon"
					className="h-6 w-6 2xl:h-8 2xl:w-8"
				/>
			</div>
		</div>
	);
}
