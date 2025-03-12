export default function FeatureItem({ icon, text, size }) {
	return (
		<>
			{size === 'large' && (
				<div className="flex items-center gap-4">
					<div className="w-10 h-10 rounded-full flex items-center justify-center">
						<img src={icon} />
					</div>
					<p className="text-[#0A0A0A]">{text}</p>
				</div>
			)}

			{size === 'medium' && (
				<div className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4">
					<img src={icon} />
					<p className="text-[#0A0A0A]">{text}</p>
				</div>
			)}
		</>
	);
}
