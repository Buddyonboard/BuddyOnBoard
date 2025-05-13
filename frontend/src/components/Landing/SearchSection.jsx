import { Separator } from '../ui/separator';
import CONST from '@/utils/constants';
import TabToggle from '../ReUsable/tabToggle';
import useTabToggle from '@/hooks/useTabToggle';
import AirportSearch from '../ReUsable/SearchBar/Airport-Search';
import { useState } from 'react';
import DatePicker from '../ReUsable/SearchBar/Date-Picker';
import SelectPackageType from '../ReUsable/SearchBar/Select-Package-Type';
import { useNavigate } from 'react-router-dom';
import SearchButton from '../ReUsable/SearchBar/SearchButton';
import { searchFunction } from '@/utils/searchHandler';

export default function SearchSection() {
	const { tabOpen, toggle, selectedTab, setSelectedTab } = useTabToggle();
	const [airportFromSelected, setAirportFromSelected] = useState(null);
	const [airportToSelected, setAirportToSelected] = useState(null);
	const [date, setDate] = useState(undefined);
	const [selectedPackageType, setSelectedPackageType] = useState('');
	const navigate = useNavigate();

	/**** Handle Search Button Functionality ****/
	function handleSearch() {
		searchFunction(
			selectedTab,
			airportFromSelected,
			airportToSelected,
			date,
			selectedPackageType,
			navigate
		);
	}

	return (
		<>
			<section className="relative py-8 md:py-12 lg:py-20 px-4">
				<div className="container mx-auto relative z-10">
					<div>
						{/******* Page Title *******/}
						<h1
							className="text-3xl md:text-4xl lg:text-5xl font-light
						text-white lg:mb-24 mb-6 font-merriweather"
						>
							{CONST.landingTitle}
						</h1>

						{/****** Tabs selection *******/}
						<div className="flex flex-col gap-1 items-baseline sm:flex-row sm:gap-5">
							<p className="text-white font-bold lg:text-[20px] md:text-[14px]">
								{CONST.lookingFor}
							</p>
							<TabToggle
								onToggle={toggle}
								setValue={setSelectedTab}
								tabNames={[`${CONST.travelBuddy}`, `${CONST.courierBuddy}`]}
							/>
						</div>

						{/******* Search bar input *******/}
						<div className="lg:flex lg:flex-row lg:gap-6">
							<div
								className={`bg-white rounded-3xl ${
									tabOpen && 'md:gap-0 gap-2'
								} p-4 grid grid-cols-1 md:flex md:flex-row md:w-full`}
							>
								<div className="md:w-full">
									{/******* FROM *******/}
									<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
										FROM
									</label>
									<AirportSearch setAirportFromSelected={setAirportFromSelected} />
								</div>

								{/* Vertical Separator for Desktop, Tablet, and Laptop */}
								<Separator orientation="vertical" className="hidden md:block" />
								{/* Horizontal Separator for Mobile Screens */}
								<Separator orientation="horizontal" className="block md:hidden" />

								<div className="md:w-full">
									{/******* TO *******/}
									<label
										className="text-bob-search-input-label-color
										ml-3 font-bold text-xs"
									>
										TO
									</label>
									<AirportSearch setAirportToSelected={setAirportToSelected} />
								</div>

								<Separator orientation="vertical" className="hidden md:block" />
								<Separator orientation="horizontal" className="hidden" />

								<div className="hidden md:block md:w-full">
									{/******* DATE ********/}
									<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
										DATE
									</label>
									<DatePicker setDate={setDate} date={date} />
								</div>

								{/********** Courier Buddy Block ***********/}
								{tabOpen && (
									<>
										{/* Vertical Separator for Desktop, Tablet, and Laptop */}
										<Separator orientation="vertical" className="hidden md:block" />
										{/* Horizontal Separator for Mobile Screens */}
										<Separator orientation="horizontal" className="block md:hidden" />

										<div className="w-full">
											{/******** TYPE OF PACKAGE ********/}
											<label className="text-xs text-bob-search-input-label-color mb-1 ml-3 font-bold">
												TYPE OF PACKAGE
											</label>
											<SelectPackageType setSelectedPackageType={setSelectedPackageType} />
										</div>
									</>
								)}
							</div>

							{/*********** Separate Date block :: Mobile view ***********/}
							<div className="block md:hidden bg-white rounded-3xl p-4 mt-5">
								<label className="text-xs text-bob-search-input-label-color ml-3 font-bold">
									DATE
								</label>
								<DatePicker setDate={setDate} date={date} />
							</div>

							{/*************** Search Button *****************/}
							<SearchButton handleSearch={handleSearch} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
