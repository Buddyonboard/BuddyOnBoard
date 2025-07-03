import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip';
import CarouselFlight from '@/assets/Landing/CarouselFlight.svg';

export default function FlightStopType({ connectionType, connectionLocation }) {
	const directFlight = connectionType === 0 && 'Direct';
	const oneStop = connectionType === 1 && 'One Stop';
	const twoStop = connectionType === 2 && 'Two Stop';

	return (
		<div className="my-4 flex flex-col items-center md:my-0 text-bob-travel-details-color 2xl:text-lg">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="relative flex w-20 items-center justify-center md:w-32">
							{/* Journey Flight Icon */}
							<div className="flex flex-col items-center mx-2">
								<img
									src={CarouselFlight}
									alt="CarouselFlight"
									className="2xl:w-16 2xl:h-16"
								/>
							</div>
						</div>
					</TooltipTrigger>
					{connectionLocation?.length > 0 && (
						<TooltipContent
							className="rounded-lg p-2 text-sm shadow-md bg-white text-gray-800"
							hideArrow
						>
							<div className="flex flex-col space-y-1">
								{connectionLocation?.map((detail, index) => (
									<div key={index}>{detail}</div>
								))}
							</div>
						</TooltipContent>
					)}
				</Tooltip>
			</TooltipProvider>

			{/****** Display Connection Type ******/}
			{directFlight || oneStop || twoStop}
		</div>
	);
}
