import { Button } from '@/components/ui/button';
import CONST from '@/utils/Constants';

import TravellersProfilesBadge from '@/assets/Landing/TravellersProfilesBadge.svg';
import { Link } from 'react-router-dom';

export default function MissionSection() {
	return (
		<section className="py-12 md:py-16 px-4">
			<div className="mx-auto max-w-6xl md:p-8 max-sm:pt-2 max-sm:pb-8 rounded-3xl bg-blue-600 text-white">
				<div className="flex flex-col items-center justify-between">
					<div className="sm:max-md:mb-6 mb-0 p-5 text-center justify-items-center">
						<h2 className="text-xl md:text-[42px] font-medium mb-3 font-merriweather">
							{CONST.FAQ[0].productMission}
						</h2>
						<div className="flex md:flex-row flex-col max-sm:items-center text-center gap-2">
							<div className="px-2 py-1">
								<img src={TravellersProfilesBadge} alt="Travellers Profiles Badge" />
							</div>
							<p className="text-sm md:text-2xl">{CONST.FAQ[0].travelersJoined}</p>
						</div>
					</div>
					<div>
						<Link to={CONST.LANDING[0].loginSection.href}>
							<Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 md:text-xl text-sm cursor-pointer">
								{CONST.LANDING[0].loginSection.name}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
