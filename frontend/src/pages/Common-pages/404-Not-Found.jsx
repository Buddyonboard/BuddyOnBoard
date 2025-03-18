import CONST from '@/utils/Constants';

export default function NotFound() {
	return (
		<div className="flex flex-col md:gap-8 gap-5 justify-center items-center min-h-screen">
			<h1 className="md:text-5xl text-3xl font-merriweather">
				{CONST.notFoundTitle}
			</h1>
			<p className="text-[#282828] md:text-xl text-sm text-center">
				{CONST.notFoundDescription}
			</p>
		</div>
	);
}
