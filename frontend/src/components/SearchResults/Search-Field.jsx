import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import CONST from '@/utils/constants';
import TabToggle from '@/components/ReUsable/tabToggle';
import useTabToggle from '@/hooks/useTabToggle';
import MagnifyingGlassIcon from '@/assets/Common/Icons/MagnifyingGlassIcon.svg';

export default function SearchField() {
	const { tabOpen, toggle } = useTabToggle();

	return (
		<div>
			<section className="py-10">
				<div className="container mx-auto">
					{/* Tabs selection */}
					<div className="flex flex-col gap-1 items-baseline sm:flex-row sm:gap-5">
						<p className="text-secondary-color font-bold lg:text-[20px] md:text-[14px]">
							{CONST.lookingFor}
						</p>
						<TabToggle
							onToggle={toggle}
							tabNames={[`${CONST.travelBuddy}`, `${CONST.courierBuddy}`]}
						/>
					</div>

					{/* Search bar input */}
					<div className="lg:flex lg:flex-row lg:gap-6">
						<div
							className={`bg-white rounded-3xl ${
								tabOpen && 'md:gap-0 gap-2'
							} p-4 grid grid-cols-1 md:flex md:flex-row md:w-full`}
						>
							<div className="md:w-full">
								<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
									FROM
								</label>
								<Input
									placeholder="Add an airport"
									className="w-full border-0 outline-none border-none focus-visible:ring-0 shadow-none"
								/>
							</div>

							{/* Vertical Separator for Desktop, Tablet, and Laptop */}
							<Separator orientation="vertical" className="hidden md:block" />
							{/* Horizontal Separator for Mobile Screens */}
							<Separator orientation="horizontal" className="block md:hidden" />

							<div className="md:w-full">
								<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
									TO
								</label>
								<Input
									placeholder="Add an airport"
									className="w-full border-0 outline-none border-none focus-visible:ring-0 shadow-none"
								/>
							</div>

							<Separator orientation="vertical" className="hidden md:block" />
							<Separator orientation="horizontal" className="hidden" />

							<div className="hidden md:block md:w-full">
								<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
									DATE
								</label>
								<Input
									placeholder="Choose a date"
									className="w-full border-0 outline-none border-none focus-visible:ring-0 shadow-none"
								/>
							</div>

							{/*** Courier Buddy Block ****/}
							{tabOpen && (
								<>
									{/* Vertical Separator for Desktop, Tablet, and Laptop */}
									<Separator orientation="vertical" className="hidden md:block" />
									{/* Horizontal Separator for Mobile Screens */}
									<Separator orientation="horizontal" className="block md:hidden" />
									<div className="w-full">
										<label className="text-xs text-bob-search-input-label-color mb-1  ml-3 font-bold">
											TYPE OF PACKAGE
										</label>
										<Input
											placeholder="Select your item"
											className="w-full border-0 outline-none border-none focus-visible:ring-0"
										/>
									</div>
								</>
							)}
						</div>

						{/* Separate Date block :: Mobile view */}
						<div className="block md:hidden bg-white rounded-3xl p-4 mt-5">
							<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
								DATE
							</label>
							<Input
								placeholder="Choose a date"
								className="w-full border-0 outline-none border-none focus-visible:ring-0"
							/>
						</div>

						{/* Search Button */}
						<div className="hidden lg:flex lg:justify-end lg:mt-0">
							{/* <Button className="bg-blue-600 hover:bg-blue-700 text-2xl"> */}
							<Button className="lg:h-20 lg:mt-1.5 bg-bob-color hover:bg-blue-700 lg:w-40 text-2xl cursor-pointer border-bob-border-color border-2 rounded-3xl">
								Search
								<img src={MagnifyingGlassIcon} alt="Magnifying Glass Icon" />
							</Button>
						</div>

						{/* Search button :: Mobile view */}
						<div className="block lg:hidden mt-5">
							<Button className="bg-bob-color hover:bg-blue-700 text-base w-full p-4 cursor-pointer border-bob-border-color border-2 rounded-3xl">
								Search <img src={MagnifyingGlassIcon} alt="Magnifying Glass Icon" />
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
