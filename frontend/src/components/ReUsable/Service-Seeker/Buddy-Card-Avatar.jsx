// import UserPicOutline from '@/assets/Common/circle-user-round.svg';
// import ProfilePicPlaceholder from '@/assets/Common/Profile-Pic-Placeholder.svg';

export default function BuddyCardAvatar({
	// userAvatar,
	// altAvatarName,
	userName
}) {
	const firstLetter = userName?.charAt(0).toUpperCase();
	return (
		<>
			{/* <img
				src={userAvatar || ProfilePicPlaceholder}
				alt={altAvatarName}
				className="rounded-full h-[42px] w-[42] 2xl:h-[55px] 2xl:w-[55px]"
			/> */}

			<div className="w-10 h-10 rounded-full bg-bob-color text-primary-color flex items-center justify-center font-bold text-lg">
				{firstLetter || '?'}
			</div>
		</>
	);
}
