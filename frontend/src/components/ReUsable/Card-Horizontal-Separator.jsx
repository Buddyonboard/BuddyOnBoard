import { Separator } from '../ui/separator';

export default function CardHorizontalSeparator() {
	return (
		<Separator
			className="md:hidden block w-0.5 bg-[#CCCCCC]
            data-[orientation=horizontal]:w-[90%]"
			orientation="horizontal"
		/>
	);
}
