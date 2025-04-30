import LineSeparator from '@/assets/Common/Line-Separator.svg';
import { Separator } from '../ui/separator';

export default function CardVerticalSeparator({ page }) {
	return (
		<>
			{page === 'listingInfo' ? (
				<Separator
					orientation="vertical"
					className="data-[orientation=vertical]:h-24 data-[orientation=vertical]:w-[1px] bg-[#CCCCCC] lg:ml-15 md:block hidden"
				/>
			) : (
				<img
					className="md:block hidden w-0.5"
					src={LineSeparator}
					alt="Line Separator"
				/>
			)}
		</>
	);
}
