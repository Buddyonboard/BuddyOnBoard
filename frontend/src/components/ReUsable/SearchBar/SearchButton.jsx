import MagnifyingGlassIcon from '@/assets/Common/Icons/MagnifyingGlassIcon.svg';
import { Button } from '@/components/ui/button';

export default function SearchButton({ handleSearch }) {
	return (
		<>
			{/******** Search button :: Normal view *********/}
			<div className="hidden lg:flex lg:justify-end lg:mt-0">
				<Button
					className="lg:h-20 lg:mt-1.5 bg-bob-color hover:bg-blue-700 lg:w-40 text-2xl cursor-pointer border-bob-border-color border-2 rounded-3xl"
					onClick={handleSearch}
				>
					Search
					<img src={MagnifyingGlassIcon} alt="Magnifying Glass Icon" />
				</Button>
			</div>

			{/******** Search button :: Mobile view *********/}
			<div className="block lg:hidden mt-5">
				<Button
					className="bg-bob-color hover:bg-blue-700 text-base w-full p-4 cursor-pointer border-bob-border-color border-2 rounded-3xl"
					onClick={handleSearch}
				>
					Search <img src={MagnifyingGlassIcon} alt="Magnifying Glass Icon" />
				</Button>
			</div>
		</>
	);
}
