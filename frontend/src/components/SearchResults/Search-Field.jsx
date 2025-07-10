import { Separator } from '@/components/ui/separator';
import CONST from '@/utils/constants';
import TabToggle from '@/components/ReUsable/tabToggle';
import useTabToggle from '@/hooks/useTabToggle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchButton from '../ReUsable/SearchBar/SearchButton';
import AirportSearch from '../ReUsable/SearchBar/Airport-Search';
import DatePicker from '../ReUsable/SearchBar/Date-Picker';
import SelectPackageType from '../ReUsable/SearchBar/Select-Package-Type';
import { searchFunction } from '@/utils/searchHandler';

export default function SearchField() {
	const navigate = useNavigate();
	const { tabOpen, setTabOpen, toggle, setSelectedTab, selectedTab } =
		useTabToggle();

	/**** Get URL Query Params *****/
	const [params] = useSearchParams();
	const queryParams = {
		type: params.get('serviceType'),
		from: params.get('from'),
		to: params.get('to'),
		date: params.get('date'),
		packageType: params.get('packageType')
	};

	/**** Bind Query values to different useState *****/
	const [airportFromSelected, setAirportFromSelected] = useState(
		queryParams.from || null
	);
	const [airportToSelected, setAirportToSelected] = useState(
		queryParams.to || null
	);
	const [date, setDate] = useState(() => {
		return queryParams.date ? new Date(queryParams.date) : undefined;
	});
	const [selectedPackageType, setSelectedPackageType] = useState(
		queryParams.packageType || ''
	);

	/* To set tab option to courier if packageType exists */
	const packageType = queryParams.packageType;
	useEffect(() => {
		if (packageType !== null) {
			setTabOpen(true);
			setSelectedTab('courier');
		}
	}, [packageType]);

	/* To set toggle value based on search input */
	const type =
		queryParams.type === 'courier' ? CONST.courierBuddy : CONST.travelBuddy;

	/* To set search From & To values */
	const searchFieldValue = [queryParams.from, queryParams.to];

	/**** Handle Search Button Functionality ****/
	function handleSearch() {
		const paramsValues = searchFunction(
			selectedTab,
			airportFromSelected,
			airportToSelected,
			date,
			selectedPackageType,
			navigate
		);

		const serviceType =
			selectedTab === 'travel' ? 'Travel Buddy' : 'Courier Buddy';

		if (!paramsValues) return; // validation failed

		navigate(`/search?${paramsValues.toString()}&serviceType=${serviceType}`);
	}

	return (
		<div>
			<section className="py-10">
				<div className="max-lg:container max-lg:mx-auto">
					{/**** Tabs selection ****/}
					<div className="flex flex-col gap-1 items-baseline sm:flex-row sm:gap-5">
						<p className="text-secondary-color font-bold lg:text-[20px] md:text-[14px]">
							{CONST.lookingFor}
						</p>
						<TabToggle
							onToggle={toggle}
							setValue={setSelectedTab}
							tabNames={[`${CONST.travelBuddy}`, `${CONST.courierBuddy}`]}
							type={type}
						/>
					</div>

					{/**** Search bar input ****/}
					<div className="lg:flex lg:flex-row lg:gap-6">
						<div
							className={`bg-white rounded-3xl ${
								tabOpen && 'md:gap-0 gap-2'
							} p-4 grid grid-cols-1 md:flex md:flex-row md:w-full`}
						>
							<div className="md:w-full">
								{/**** FROM ****/}
								<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
									FROM
								</label>
								<AirportSearch
									setAirportFromSelected={setAirportFromSelected}
									searchFieldValue={searchFieldValue[0]}
								/>
							</div>

							{/* Vertical Separator for Desktop, Tablet, and Laptop */}
							<Separator orientation="vertical" className="hidden md:block" />
							{/* Horizontal Separator for Mobile Screens */}
							<Separator orientation="horizontal" className="block md:hidden" />

							<div className="md:w-full">
								{/**** TO ****/}
								<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
									TO
								</label>
								<AirportSearch
									setAirportToSelected={setAirportToSelected}
									searchFieldValue={searchFieldValue[1]}
								/>
							</div>

							<Separator orientation="vertical" className="hidden md:block" />
							<Separator orientation="horizontal" className="hidden" />

							<div className="hidden md:block md:w-full">
								{/**** DATE ****/}
								<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
									DATE
								</label>
								<DatePicker setDate={setDate} date={date} />
							</div>

							{/*** Courier Buddy Block ****/}
							{tabOpen && (
								<>
									{/* Vertical Separator for Desktop, Tablet, and Laptop */}
									<Separator orientation="vertical" className="hidden md:block" />
									{/* Horizontal Separator for Mobile Screens */}
									<Separator orientation="horizontal" className="block md:hidden" />

									<div className="w-full">
										{/**** TYPE OF PACKAGE ****/}
										<label className="text-xs text-bob-search-input-label-color mb-1  ml-3 font-bold">
											TYPE OF PACKAGE
										</label>
										<SelectPackageType
											setSelectedPackageType={setSelectedPackageType}
											selectedPackageType={selectedPackageType}
										/>
									</div>
								</>
							)}
						</div>

						{/******* Separate Date block :: Mobile view ********/}
						<div className="block md:hidden bg-white rounded-3xl p-4 mt-5">
							{/**** DATE ****/}
							<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
								DATE
							</label>
							<DatePicker setDate={setDate} date={date} />
						</div>

						{/******** Search Button **********/}
						<SearchButton handleSearch={handleSearch} />
					</div>
				</div>
			</section>
		</div>
	);
}
