import { Button } from '@/components/ui/button';
import { getuserProfile } from '@/utils/localStorageHelper';
import { Link } from 'react-router-dom';

export default function LayoutPageHeader() {
	const userProfile = getuserProfile();

	return (
		<header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
			{/***** User Name ******/}
			<h1 className="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl font-normal font-merriweather text-bob-tiles-text-color">
				Welcome back, {userProfile.firstName}
			</h1>

			{/***** Create Listing Button ******/}
			<Link to="/create-listing">
				<Button
					className="bg-bob-color border-2 border-bob-border-color max-sm:w-full
                rounded-2xl 2xl:text-xl 2xl:py-6 2xl:px-5 py-5 px-3 font-semibold cursor-pointer"
				>
					Create a listing
				</Button>
			</Link>
		</header>
	);
}
