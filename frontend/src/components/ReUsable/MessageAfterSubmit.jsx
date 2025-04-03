import CONST from '@/utils/Constants';
import { Link, useNavigate } from 'react-router-dom';

export default function MessageAfterSubmit({ title, description, page }) {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col md:gap-8 gap-4 justify-center items-center min-h-screen font-normal">
			<h1 className="text-[#181D27] md:text-5xl text-2xl font-merriweather text-center">
				{title}
			</h1>
			<p className="text-bob-link-placeholder-color md:text-xl text-sm text-center">
				{description}
			</p>
			{page === 'resetPassword' && (
				<Link
					className="text-bob-link-placeholder-color font-normal text-sm"
					onClick={() => {
						navigate('/forgot-password', { replace: true });
						window.location.reload();
					}}
				>
					{CONST.serviceRequestForm.forgotPassword}
				</Link>
			)}
		</div>
	);
}
