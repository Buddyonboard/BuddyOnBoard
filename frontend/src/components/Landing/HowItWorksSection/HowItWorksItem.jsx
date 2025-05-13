import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function HowItWorksItem({ icon, title, text }) {
	const rightScreenToAnimate = window.innerWidth >= 1024;

	return (
		<>
			<motion.div
				initial={rightScreenToAnimate ? { opacity: 0, x: 50 } : {}} // Start off-screen to the right
				whileInView={rightScreenToAnimate ? { opacity: 1, x: 0 } : {}} // Move in when visible
				transition={
					rightScreenToAnimate ? { duration: 0.6, ease: 'easeInOut' } : {}
				} // Smooth transition
				viewport={{ once: true }} // Ensures animation triggers only once
			>
				<Card className="border shadow-lg">
					<CardContent className="flex items-center gap-4">
						<div className="flex items-center justify-center shrink-0">
							<img src={icon} alt="Flight" />
						</div>
						<div>
							<h3 className="font-bold 2xl:text-2xl text-base">{title}</h3>
							<p className="text-sm 2xl:text-lg md:text-base font-normal text-bob-tiles-text-color">
								{text}
							</p>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</>
	);
}
