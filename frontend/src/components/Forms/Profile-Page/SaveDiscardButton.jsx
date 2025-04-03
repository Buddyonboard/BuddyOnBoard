import { Button } from '@/components/ui/button';

export default function SaveDiscardButton({
	btnName,
	type,
	onClick,
	disabled
}) {
	return (
		<Button
			type={type}
			className={`font-semibold md:text-xl text-sm rounded-2xl ${
				btnName === 'Discard Changes'
					? 'bg-primary-color text-bob-color '
					: 'bg-bob-color text-primary-color'
			} 
			border-bob-border-color border-2 p-6 cursor-pointer md:mt-5 mt-4`}
			disabled={disabled}
			onClick={onClick}
		>
			{btnName}
		</Button>
	);
}
