import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function ListingTypeSelector({
	icon,
	title,
	route,
	description,
	value
}) {
	function handleRadioChange(event) {
		const checkedValue = event.target.value;
		console.log(checkedValue);
	}

	return (
		<div className="relative">
			<Link to={route}>
				<input
					type="radio"
					name="listing-type"
					id={title.replace(/\s+/g, '-').toLowerCase()}
					className="sr-only"
					value={value}
					onChange={handleRadioChange}
				/>
				<label
					htmlFor={title.replace(/\s+/g, '-').toLowerCase()}
					className="block cursor-pointer"
				>
					<Card className="border-2 hover:border-bob-color">
						<CardContent className="p-4 md:p-6">
							<div className="flex gap-4 items-start">
								<div>
									<img src={icon} alt={icon} />
								</div>
								<div className="flex-1">
									<h3
										className="font-bold text-bob-tiles-text-color 
                                    2xl:text-3xl lg:text-2xl text-xl mb-1"
									>
										{title}
									</h3>
									<p
										className="text-bob-tiles-text-color 2xl:text-2xl
                                    lg:text-lg text-base font-normal"
									>
										{description}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</label>
			</Link>
		</div>
	);
}
