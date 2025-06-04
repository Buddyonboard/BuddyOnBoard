import { Button } from '@/components/ui/button';

export default function ProfileSubmitButton({
	btnName,
	type,
	disabled
	// handleProfileSubmit
}) {
	return (
		<Button
			type={type}
			className="font-semibold md:text-xl text-sm rounded-2xl 
			bg-bob-color text-primary-color
			border-bob-border-color border-2 p-6 cursor-pointer md:mt-5 mt-4"
			disabled={disabled}
			// onClick={handleProfileSubmit}
		>
			{btnName}
		</Button>
	);
}
