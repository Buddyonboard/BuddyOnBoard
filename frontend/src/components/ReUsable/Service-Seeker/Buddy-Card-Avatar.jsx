import UserPicOutline from '@/assets/Common/circle-user-round.svg';

export default function BuddyCardAvatar({ userAvatar, altAvatarName }) {
	return (
		<img
			src={userAvatar || UserPicOutline}
			alt={altAvatarName}
			className="rounded-full h-[42px] w-[42]"
		/>
	);
}
