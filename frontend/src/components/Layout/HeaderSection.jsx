import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, UserRound, X } from 'lucide-react';
import CONST from '@/utils/constants';
import { useFirebase } from '@/context/Firebase-Context';
import FooterBrandImage from '@/assets/Common/FooterBrandImage.svg';

const userProfileIcon = <UserRound size={18} />;

export default function HeaderSection({ scrollToSection, page }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, logout } = useFirebase();
	const location = useLocation();
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleNavigation = (e, href) => {
		e.preventDefault();

		/* Logout Function */
		if (href === 'logout') {
			navigate('/sign-in');
			return logout();
		}

		/* If on landing page, scroll to how-it-works section */
		if (href === 'how-it-works' && location.pathname === '/') {
			return scrollToSection(href);
		}

		navigate(`/${href}`);
	};

	return (
		<>
			{CONST.LANDING.map((item) => (
				<header
					className={`${
						page === 'landing' ? 'bg-none' : 'bg-bob-color 2xl:py-5'
					} relative z-50 py-4 md:py-0 px-4 flex items-center justify-between text-primary-color`}
				>
					{/****** Brand Name Logo ******/}
					<Link
						to={item.brandName.href}
						className="content-center 
							2xl:h-[55px] 2xl:w-24 2xl:ml-5
							lg:h-[55px] lg:w-20 lg:ml-5 
							md:h-[55px] md:w-20 md:ml-2
							max-sm:h-[25px] max-sm:w-16 max-sm:ml-2"
					>
						<img src={FooterBrandImage} alt="FooterBrandImage" />
					</Link>
					{/****** Nav Links *****/}
					<nav className="hidden md:flex items-center gap-6">
						{item.navSection.map((opt) => (
							<Link
								onClick={(e) => handleNavigation(e, opt.href)}
								className="2xl:text-xl md:text-base text-sm font-[600] font-dm-sans text-primary-color"
							>
								{opt.name}
							</Link>
						))}
						{/***** Conditional Login Button/User Icon *****/}
						{user ? (
							/***** User Icon Button ****/
							<div className="relative">
								<Button
									variant="outline"
									size="sm"
									className="text-secondary-color bg-bob-login-button-bg-color border-bob-border-color cursor-pointer hover:bg-bob-login-button-bg-color"
									onClick={() => setIsMenuOpen((prev) => !prev)}
								>
									{userProfileIcon}
								</Button>

								{/****** Dropdown Menu Items ******/}
								{isMenuOpen && (
									<div className="absolute right-0 mt-2 w-max border-2 border-bob-border-outline-color bg-white text-bob-icon-placeholder-color rounded-lg shadow-lg z-[1000]">
										<ul className="flex flex-col p-2">
											{item.loginNav.map((value) => (
												<li key={value.name}>
													<Link
														onClick={(e) => {
															handleNavigation(e, value.href);
															setIsMenuOpen((prev) => !prev);
														}}
														className={`flex items-center gap-2 ${
															value.name === 'Log out' && 'text-bob-error-color'
														} rounded-md px-3 py-2 font-medium`}
													>
														{value.icon} {value.name}
													</Link>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						) : (
							/******** Login Button *******/
							<Link to={item.loginSection.href}>
								<Button
									variant="outline"
									size="sm"
									className="text-secondary-color bg-bob-login-button-bg-color border-bob-border-color font-medium 2xl:text-lg text-sm cursor-pointer hover:bg-bob-login-button-bg-color 2xl:p-5 font-dm-sans"
								>
									{item.loginSection.name}
								</Button>
							</Link>
						)}
					</nav>

					{/************************ Mobile View *************************/}
					<div variant="none" className="md:hidden">
						{/* Hamburger/User Icon */}
						<button onClick={toggleMenu} aria-label="Open Menu">
							{user ? (
								<Button
									variant="outline"
									size="sm"
									className="text-secondary-color bg-bob-login-button-bg-color border-bob-border-color cursor-pointer"
								>
									{userProfileIcon}
								</Button>
							) : isMenuOpen ? (
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
							className={`absolute ${
								user &&
								'border-2 border-bob-border-outline-color text-bob-icon-placeholder-color'
							} top-14 z-50 right-4 bg-white text-black rounded-xl shadow-md transition-transform duration-300 ${
								isMenuOpen ? 'scale-100' : 'scale-0'
							}`}
						>
							<ul className="flex flex-col p-4 gap-2">
								{/* Nav Links */}
								{(user ? item.loginNav : item.navSection).map((value) => (
									<li>
										<Link
											onClick={(e) => {
												handleNavigation(e, value.href);
												setIsMenuOpen((prev) => !prev);
											}}
											className={`text-left w-full ${
												value.name === 'Log out' && 'text-bob-error-color'
											} rounded-md px-2 py-1 flex items-center gap-2 font-medium`}
										>
											{user && value.icon} {value.name}
										</Link>
									</li>
								))}
								{/* Log-in button */}
								<li className={`${user && 'hidden'}`}>
									<Link
										to={item.loginSection.href}
										onClick={() => {
											setIsMenuOpen((prev) => !prev);
										}}
										className="text-left w-full rounded-md px-2"
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
