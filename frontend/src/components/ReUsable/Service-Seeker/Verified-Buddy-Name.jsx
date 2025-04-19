import VerifiedIcon from '@/assets/Common/VerifiedIcon.svg';

export default function VerifiedBuddyName({ userName }) {
	return (
		<div>
			<div className="flex items-center gap-2">
				<span className="font-medium">{userName}</span>

				<img src={VerifiedIcon} alt="VerifiedIcon" className="h-6 w-6" />
			</div>
		</div>
	);
}
