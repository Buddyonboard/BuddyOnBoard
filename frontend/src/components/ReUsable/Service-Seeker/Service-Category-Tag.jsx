export default function ServiceCategoryTag({ serviceType, className }) {
	return (
		<div
			className="mt-3 flex items-center gap-1 rounded-full bg-bob-color px-2 py-1
            text-xs text-primary-color w-fit"
		>
			<span className={className}>{serviceType}</span>
		</div>
	);
}
