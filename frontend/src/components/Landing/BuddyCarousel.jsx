import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MoveLeft, MoveRight, Star } from 'lucide-react';
import { useState, useRef } from 'react';

import CarouselFlight from '@/assets/Landing/CarouselFlight.svg';
import DottedHorizontalLine from '@/assets/Landing/DottedHorizontalLine.svg';
import WomenProfilePicPlaceholder from '@/assets/Common/WomenProfilePicPlaceholder.svg';
import UserPicOutline from '@/assets/Common/circle-user-round.svg';
import VerifiedIcon from '@/assets/Common/VerifiedIcon.svg';
import FlightSchedule from '../ReUsable/Flight-Schedule';

const travelBuddies = [
	{
		id: '1',
		name: 'Sarah T.',
		avatar: WomenProfilePicPlaceholder,
		rating: 4.2,
		languages: ['English', 'French'],
		departure: {
			time: '08:30 AM',
			date: '22 August, 2024',
			location: 'LAX, USA'
		},
		arrival: {
			time: '12:15 PM',
			date: '22 August, 2024',
			location: 'YVR, Canada'
		}
	},
	{
		id: '2',
		name: 'Sujit K.',
		avatar: '',
		rating: 4.4,
		languages: ['English', 'Hindi', 'Tamil'],
		departure: {
			time: '12:15 PM',
			date: '22 August, 2024',
			location: 'YVR, Canada'
		},
		arrival: {
			time: '06:20 AM',
			date: '24 August, 2024',
			location: 'JFK, USA'
		}
	},
	{
		id: '3',
		name: 'James P.',
		avatar: WomenProfilePicPlaceholder,
		rating: 4.4,
		languages: ['English', 'Spanish'],
		departure: {
			time: '10:15 AM',
			date: '24 August, 2024',
			location: 'YVR, Canada'
		},
		arrival: {
			time: '08:30 AM',
			date: '25 August, 2024',
			location: 'JFK, USA'
		}
	},
	{
		id: '3',
		name: 'James P.',
		avatar: '',
		rating: 4.4,
		languages: ['English', 'Spanish'],
		departure: {
			time: '10:15 AM',
			date: '24 August, 2024',
			location: 'YVR, Canada'
		},
		arrival: {
			time: '08:30 AM',
			date: '25 August, 2024',
			location: 'JFK, USA'
		}
	},
	{
		id: '3',
		name: 'James P.',
		avatar: WomenProfilePicPlaceholder,
		rating: 4.4,
		languages: ['English', 'Spanish'],
		departure: {
			time: '10:15 AM',
			date: '24 August, 2024',
			location: 'YVR, Canada'
		},
		arrival: {
			time: '08:30 AM',
			date: '25 August, 2024',
			location: 'JFK, USA'
		}
	},
	{
		id: '3',
		name: 'James P.',
		avatar: '',
		rating: 4.4,
		languages: ['English', 'Spanish'],
		departure: {
			time: '10:15 AM',
			date: '24 August, 2024',
			location: 'YVR, Canada'
		},
		arrival: {
			time: '08:30 AM',
			date: '25 August, 2024',
			location: 'JFK, USA'
		}
	},
	{
		id: '3',
		name: 'James P.',
		avatar: WomenProfilePicPlaceholder,
		rating: 4.4,
		languages: ['English', 'Spanish'],
		departure: {
			time: '10:15 AM',
			date: '24 August, 2024',
			location: 'YVR, Canada'
		},
		arrival: {
			time: '08:30 AM',
			date: '25 August, 2024',
			location: 'JFK, USA'
		}
	}
];

export default function BuddyCarousel() {
	const scrollContainerRef = useRef(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	function scroll(direction) {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const scrollAmount = direction === 'left' ? -321 : 321;
			container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

			// Update scroll buttons visibility after scrolling
			setTimeout(() => {
				if (container) {
					setCanScrollLeft(container.scrollLeft > 0);
					setCanScrollRight(
						container.scrollLeft < container.scrollWidth - container.clientWidth
					);
				}
			}, 300);
		}
	}

	return (
		<div className="relative w-full max-w-[1440px] 2xl:max-w-[100%] mx-auto px-4 bg-bob-bg-color">
			{/* Navigation Buttons */}
			<div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
				<Button
					variant="outline"
					size="icon"
					className={`rounded-full bg-white shadow-md ${
						!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
					}`}
					onClick={() => scroll('left')}
					disabled={!canScrollLeft}
				>
					{/* <ChevronLeft className="h-4 w-4" /> */}
					<MoveLeft className="h-4 w-4" color="#000000" />
				</Button>
			</div>

			<div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
				<Button
					variant="outline"
					size="icon"
					className={`rounded-full bg-white shadow-md ${
						!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
					}`}
					onClick={() => scroll('right')}
					disabled={!canScrollRight}
				>
					{/* <ChevronRight className="h-4 w-4" /> */}
					<MoveRight className="h-4 w-4" color="#000000" />
				</Button>
			</div>

			{/* Scrollable Container */}
			<div
				ref={scrollContainerRef}
				className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
			>
				{travelBuddies.map((buddy) => (
					<Card className="min-w-[300px] max-w-[300px] snap-start shadow-none">
						<CardContent>
							{/* Journey Details */}
							<div className="flex justify-between items-center mb-4">
								<FlightSchedule
									departureTime={buddy.departure.time}
									departureDate={buddy.departure.date}
									departureLocation={buddy.departure.location}
									arrivalTime={buddy.arrival.time}
									arrivalDate={buddy.arrival.date}
									arrivalLocation={buddy.arrival.location}
								/>
							</div>

							{/* Horizontal Line Separator */}
							<img
								className="max-w-[101%]"
								src={DottedHorizontalLine}
								alt="DottedHorizontalLine"
							/>

							{/* User Profile */}
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-3 mt-4">
									{/* Profile Pic */}
									<img
										src={buddy.avatar || UserPicOutline}
										alt={buddy.name}
										className="rounded-full h-[42px] w-[42]"
									/>
									<div>
										{/* Profile Name & Verified Icon */}
										<div className="flex items-center gap-2">
											<span className="font-medium">{buddy.name}</span>

											<img src={VerifiedIcon} alt="VerifiedIcon" className="h-6 w-6" />
										</div>
									</div>
								</div>

								{/* Rating & Language */}
								<div className="flex flex-row items-end gap-2 mt-1">
									{/* <div className="flex items-center gap-2">
										<Badge
											variant="secondary"
											className="bg-bob-higher-rating-color text-white"
										>
											<Star className="h-3 w-3 mr-1 fill-current" />
											{buddy.rating}
										</Badge>
									</div> */}
									<div className="flex flex-wrap gap-1 mt-1">
										<Badge variant="outline" className="bg-bob-language-badge-color">
											Speaks {buddy.languages.join(', ')}
										</Badge>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
