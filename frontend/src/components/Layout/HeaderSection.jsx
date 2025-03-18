import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';

import CONST from '@/utils/constants';

export default function HeaderSection({ scrollToSection, page }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleNavigation = (e, href) => {
		e.preventDefault();
		if (href === 'how-it-works') {
			if (location.pathname === '/') {
				/* If on landing page, scroll to section */
				scrollToSection(href);
			} else {
				/* Navigate to how-it-works component */
				navigate(`/${href}`);
			}
		} else {
			navigate(`/${href}`); // Navigate to other pages
		}
	};

	return (
		<>
			{CONST.LANDING.map((item) => (
				<header
					className={`${
						page === 'landing' ? 'bg-none md:z-10 z-50' : 'bg-bob-color'
					} py-4 md:py-0 px-4 flex items-center justify-between text-primary-color`}
				>
					{/* Brand Name */}
					<Link
						to={item.brandName.href}
						className="text-[20px] md:text-[24px] lg:text-[32px] font-[400] font-merriweather"
					>
						{item.brandName.name}
					</Link>
					{/* Nav Links */}
					<nav className="hidden md:flex items-center gap-6">
						{item.navSection.map((opt) => (
							<Link
								onClick={(e) => handleNavigation(e, opt.href)}
								className="text-sm  font-[600]"
							>
								{opt.name}
							</Link>
						))}
						<Button
							variant="outline"
							size="sm"
							className="text-secondary-color bg-[#DAE5FC] border-[#5E89E1] cursor-pointer hover:bg-[#DAE5FC]"
						>
							{item.loginSection.name}
						</Button>
					</nav>

					{/************** Mobile View - Hamburger Icon *****************/}
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
								{/* Nav Links */}
								{item.navSection.map((value) => (
									<li>
										<Link
											// onClick={() => {
											// 	value.href === 'how-it-works' && scrollToSection(value.href);
											// 	setIsMenuOpen((prev) => !prev);
											// }}
											// to={value.href !== 'how-it-works' && value.href}
											onClick={(e) => {
												handleNavigation(e, value.href);
												setIsMenuOpen((prev) => !prev);
											}}
											className="text-left w-full hover:bg-gray-100 rounded-md px-2 py-1"
										>
											{value.name}
										</Link>
									</li>
								))}
								{/* Log-in button */}
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
		</>
	);
}
