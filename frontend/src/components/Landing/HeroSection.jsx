import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

import { Menu, X } from 'lucide-react';

import HeaderBg from '@/assets/Landing/HeaderBg.svg';
import CONST from '@/utils/constants';
import TabToggle from '../ReUsable/tabToggle';
import useTabToggle from '@/hooks/useTabToggle';

export default function HeroSection() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { tabOpen, toggle } = useTabToggle();

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<>
			<div
				className="lg:min-h-screen flex flex-col bg-cover bg-center bg-no-repeat p-2 md:p-5 lg:p-8"
				style={{ backgroundImage: `url(${HeaderBg})` }}
			>
				{/******** Navbar Section : ONLY FOR LANDING :: START ********/}
				{CONST.LANDING.map((item) => (
					<header className="container mx-auto py-4 md:py-0 px-4 flex items-center justify-between text-primary-color">
						<Link
							href={item.brandName.href}
							className="text-[20px] md:text-[24px] lg:text-[32px] font-[400] font-merriweather"
						>
							{item.brandName.name}
						</Link>
						<nav className="hidden md:flex items-center gap-6">
							{item.navSection.map((opt) => (
								<Link href={opt.href} className="text-sm  font-[600]">
									{opt.name}
								</Link>
							))}
							<Button
								variant="outline"
								size="sm"
								className="text-secondary-color hover:bg-[#DAE5FC] border-[#5E89E1]"
							>
								{item.loginSection.name}
							</Button>
						</nav>

						{/* Hamburger Icon */}
						<div variant="none" className="md:hidden">
							<button onClick={toggleMenu} aria-label="Open Menu">
								{isMenuOpen ? (
									<X size={24} className="text-white" />
								) : (
									<Menu size={24} className="text-white" />
								)}
							</button>

							{/* Mobile menu opening Overlay with Low Opacity */}
							{isMenuOpen && (
								<div
									className="fixed inset-0 bg-black/30 backdrop-opacity-100 transition-opacity duration-300 z-40"
									onClick={toggleMenu}
								></div>
							)}

							{/* Mobile Menu with Transition */}
							<div
								className={`absolute top-14 z-50 right-4 bg-white text-black rounded-xl shadow-md transition-transform duration-300 ${
									isMenuOpen ? 'scale-100' : 'scale-0'
								}`}
							>
								<ul className="flex flex-col p-4 gap-2">
									{item.navSection.map((value) => (
										<li>
											<Link
												to={value.href}
												className="text-left w-full hover:bg-gray-100 rounded-md px-2 py-1"
											>
												{value.name}
											</Link>
										</li>
									))}
									<li>
										<Link
											to={item.loginSection.href}
											className="text-left w-full hover:bg-gray-100 rounded-md px-2 py-1"
										>
											{item.loginSection.name}
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</header>
				))}
				{/******** Navbar Section : ONLY FOR LANDING :: END ********/}

				{/******* Search Section :: START ********/}
				<section className="relative py-8 md:py-12 lg:py-20 px-4">
					<div className="container mx-auto relative z-10">
						<div>
							<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-merriweather">
								{CONST.landingTitle}
							</h1>

							{/* Tabs selection */}
							<div className="flex flex-col gap-1 items-baseline sm:flex-row sm:gap-5">
								<p className="text-white font-bold lg:text-[20px] md:text-[14px]">
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
									{/* <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col md:flex-row gap-4"> */}
									<div className="md:w-full">
										<label className="text-xs text-[#5A5A5A] ml-3 font-bold">FROM</label>
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
										<label className="text-xs text-[#5A5A5A] ml-3 font-bold">TO</label>
										<Input
											placeholder="Add an airport"
											className="w-full border-0 outline-none border-none focus-visible:ring-0 shadow-none"
										/>
									</div>

									<Separator orientation="vertical" className="hidden md:block" />
									<Separator orientation="horizontal" className="hidden" />

									<div className="hidden md:block md:w-full">
										<label className="text-xs text-[#5A5A5A] ml-3 font-bold">DATE</label>
										<Input
											placeholder="Choose a date"
											className="w-full border-0 outline-none border-none focus-visible:ring-0 shadow-none"
										/>
									</div>

									{/*** Courier Buddy Block ****/}
									{tabOpen && (
										<>
											{/* <Separator orientation="vertical" /> */}
											{/* Vertical Separator for Desktop, Tablet, and Laptop */}
											<Separator orientation="vertical" className="hidden md:block" />
											{/* Horizontal Separator for Mobile Screens */}
											<Separator orientation="horizontal" className="block md:hidden" />
											<div className="w-full">
												<label className="text-xs text-[#5A5A5A] mb-1  ml-3 font-bold">
													TYPE OF PACKAGE
												</label>
												<Input
													placeholder="Add an airport"
													className="w-full border-0 outline-none border-none focus-visible:ring-0"
												/>
											</div>
										</>
									)}
								</div>

								{/* Separate Date block :: Mobile view */}
								<div className="block md:hidden bg-white rounded-3xl p-4 mt-5">
									<label className="text-xs text-[#5A5A5A] ml-3 font-bold">DATE</label>
									<Input
										placeholder="Choose a date"
										className="w-full border-0 outline-none border-none focus-visible:ring-0"
									/>
								</div>

								{/* Search Button */}
								<div className="hidden lg:flex lg:justify-end lg:mt-0">
									{/* <Button className="bg-blue-600 hover:bg-blue-700 text-2xl"> */}
									<Button className="lg:h-20 lg:mt-1.5 bg-[#0D53E0] hover:bg-blue-700 lg:w-40 text-2xl">
										Search
										{/* <Search style={{ width: '25px', height: '25px', marginTop: '5px', gap: '5px' }} /> */}
										{/* <Search className="w-5 h-5 md:w-6 md:h-6 lg:w-10 lg:h-10" /> */}
										{/* <div className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] md:w-6 md:h-6">
											<Search size={30} />
										</div> */}
									</Button>
								</div>

								{/* Search button :: Mobile view */}
								<div className="block lg:hidden mt-5">
									<Button className="bg-[#0D53E0] hover:bg-blue-700 text-base w-full p-4">
										Search
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/******* Search Section :: END ********/}
			</div>
		</>
	);
}
