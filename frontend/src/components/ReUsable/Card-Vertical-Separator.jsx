import LineSeparator from '@/assets/Common/Line-Separator.svg';

export default function CardVerticalSeparator() {
	return (
		<img
			className="md:block hidden w-0.5"
			src={LineSeparator}
			alt="Line Separator"
		/>
	);
}
