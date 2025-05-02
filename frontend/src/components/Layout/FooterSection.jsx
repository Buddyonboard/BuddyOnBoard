import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Separator } from '../ui/separator';
import FacebookIcon from '@/assets/Common/Icons/FacebookIcon.svg';
import TwitterIcon from '@/assets/Common/Icons/TwitterIcon.svg';
import LinkedinIcon from '@/assets/Common/Icons/LinkedinIcon.svg';
import FooterBrandImage from '@/assets/Common/FooterBrandImage.svg';

import CONST from '@/utils/Constants';

const iconImages = [
	{
		name: FacebookIcon,
		href: '/',
		alt: 'FacebookIcon'
	},
	{
		name: TwitterIcon,
		href: '/',
		alt: 'TwitterIcon'
	},
	{
		name: LinkedinIcon,
		href: '/',
		alt: 'LinkedinIcon'
	}
];

export default function FooterSection({ scrollToSection }) {
	const [year, setYear] = useState(new Date().getFullYear());
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		// Update the year when the component mounts
		setYear(new Date().getFullYear());
	}, []);

	const handleNavigation = (e, href) => {
		e.preventDefault();

		/* If on landing page, scroll to how-it-works section */
		if (href === 'how-it-works' && location.pathname === '/') {
			return scrollToSection(href);
		}

		navigate(`/${href}`, { replace: true });
	};

	return (
		<footer className="py-12 md:py-5 px-4">
			{CONST.footerSection.map((item) => (
				<div
					className={`
					bg-blue-600 bg-[url(@/assets/Common/FooterBackgroundGrid.svg)]
					text-[#F7F7F7]	md:p-12	p-8	rounded-2xl`}
				>
					{/******* Footer Heading *******/}
					<h2 className="md:w-full w-2/3 md:mb-10 mb-8">
						<img src={FooterBrandImage} alt="Footer Brand Image" />
					</h2>

					{/*************** Platform & Social Links  ****************/}
					<div className="flex lg:flex-row flex-col-reverse lg:gap-2 gap-8 lg:justify-between lg:items-center items-start">
						{/******* Platform Links *******/}
						<div className="flex md:flex-row flex-col md:gap-6 gap-4 font-bold">
							{item.navigationLink.map((itm) => (
								<Link
									onClick={(e) => {
										handleNavigation(e, itm.href);
									}}
									className="text-sm lg:text-[20px] hover:text-blue-200"
								>
									{itm.name}
								</Link>
							))}
						</div>

						{/******* Social Media Links *******/}
						<div className="flex gap-4">
							{iconImages.map((icon) => (
								<Link to={icon.href} className="hover:text-blue-200">
									<img src={icon.name} alt={icon.alt} />
								</Link>
							))}
						</div>
					</div>

					{/* Horizontal Line */}
					<Separator orientation="horizontal" className="lg:mt-16 mt-8" />

					{/****** Copyright and Privacy Links *******/}
					<div className="flex lg:flex-row flex-col-reverse gap-2 lg:justify-between lg:items-baseline lg:mt-8 mt-5 items-start font-normal">
						<p>{`©${year} ${CONST.footerSection[0].tradeMark}`}</p>
						<div className="flex md:flex-row flex-col gap-4 mb-4">
							{item.privacyPolicy.map((value) => (
								<Link
									className="hover:text-blue-200"
									onClick={(e) => {
										handleNavigation(e, value.href);
										window.scroll({
											top: 0,
											left: 0
										});
									}}
								>
									{value.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			))}
		</footer>
	);
}
