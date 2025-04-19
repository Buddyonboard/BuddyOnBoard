import { Card } from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import CardVerticalSeparator from '../ReUsable/Card-Vertical-Separator';
import CardHorizontalSeparator from '../ReUsable/Card-Horizontal-Separator';

export default function ListingCardSkeleton() {
	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl py-0">
			<div className="flex flex-col-reverse md:flex-row items-center md:max-lg:justify-between max-sm:gap-5">
				{/************ User Info Section *************/}
				<div className="pl-5 pb-5 md:w-1/3 w-full">
					{/***** Profile Pic and Verified Tag *****/}
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-3 mt-4">
							<div className="flex flex-col space-y-3">
								{/*** Profile Pic ***/}
								<div className="flex items-center gap-3">
									<Skeleton className="rounded-full h-[42px] w-[42] size-10" />
									<Skeleton className="h-4 w-30 rounded-none" />
								</div>

								{/**** Type of Booking - Travel/Courier *****/}
								<Skeleton className="h-3 w-60 rounded-xl" />
								<Skeleton className="h-3 w-60 rounded-xl" />
							</div>
						</div>
					</div>
				</div>

				{/* Vertical Line Separator */}
				<CardVerticalSeparator />
				{/* Horizontal Line Separator */}
				<CardHorizontalSeparator />

				<div className="flex flex-col lg:flex-row justify-evenly md:max-lg:items-baseline max-sm:items-center">
					{/******** Flight Details Section **********/}
					<div className="flex flex-1 flex-col lg:p-5 md:py-2.5 py-4 md:pr-10 md:px-0 px-4">
						<div className="flex flex-row justify-center gap-5">
							{/***** Departure *****/}
							<div className="flex flex-col gap-3">
								<Skeleton className="h-8 w-34 rounded-none" />
								<Skeleton className="h-6 w-34 rounded-none" />
								<Skeleton className="h-6 w-34 rounded-none" />
							</div>

							{/**** Flight Connection Type ****/}
							<div className="flex items-center gap-2">
								<Skeleton className="size-8 rounded-full" />
							</div>

							{/***** Arrival *****/}
							<div className="flex flex-col gap-3">
								<Skeleton className="h-8 w-34 rounded-none" />
								<Skeleton className="h-6 w-34 rounded-none" />
								<Skeleton className="h-6 w-34 rounded-none" />
							</div>
						</div>
					</div>

					{/***** Vertical Line Separator *****/}
					<CardVerticalSeparator />

					{/****** Actions or Status *******/}
					<div className="flex justify-center align-middle ml-7 mt-5">
						<Skeleton className="h-25 w-37 rounded-none" />
					</div>
				</div>
			</div>
		</Card>
	);
}
