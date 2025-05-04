import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import CONST from '@/utils/Constants';

export default function PassengersInfoCard({
	passengerCount,
	decrementPassengers,
	incrementPassengers
}) {
	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl">
			<CardContent>
				<h2 className="mb-6 2xl:text-2xl text-xl font-semibold text-bob-accordion-content-color">
					{CONST.sendRequestForm.addYourDetails}
				</h2>

				<div className="space-y-6">
					<div>
						{/*********** Passenger Addition/Substraction ********/}
						<div className="flex items-center justify-between">
							{/***** Number of Passenger Allowed *****/}
							<div>
								<p className="font-medium text-base 2xl:text-xl">
									{CONST.sendRequestForm.totalPassengers}
								</p>
								<p className="2xl:text-base md:text-sm text-xs font-normal text-[#A8A8A8] mt-1">
									{CONST.sendRequestForm.passengersAllowed}
								</p>
							</div>

							{/***** Handling Number of Passengers ******/}
							<div className="flex items-center gap-3">
								<Button
									variant="outline"
									size="icon"
									className="rounded-full"
									onClick={decrementPassengers}
									disabled={passengerCount <= 1}
								>
									<Minus className="size-4" />
								</Button>
								<span className="2xl:text-xl max-sm:text-sm w-6 text-center">
									{passengerCount}
								</span>
								<Button
									variant="outline"
									size="icon"
									className="rounded-full"
									onClick={incrementPassengers}
									disabled={passengerCount >= 3}
								>
									<Plus className="size-4" />
								</Button>
							</div>
						</div>
					</div>

					{/********** Passengers Number and Details *************/}
					{Array.from({ length: passengerCount }).map((_, index) => (
						<div key={index}>
							{/****** Number Of Passengers display *****/}
							<h3 className="mb-4 font-semibold 2xl:text-2xl text-base text-bob-search-input-label-color">
								Passenger {index + 1}
							</h3>

							{/****** Passenger Details display *****/}
							<div className="grid gap-4 md:grid-cols-2">
								{/* Age Input */}
								<div>
									<label
										htmlFor={`age-${index}`}
										className="mb-1 block 2xl:text-lg text-sm font-medium text-bob-search-input-label-color"
									>
										Age*
									</label>
									<Input
										id={`age-${index}`}
										placeholder="Enter the age of the passenger"
										className="w-full"
									/>
								</div>

								{/* Gender Input */}
								<div>
									<label
										htmlFor={`gender-${index}`}
										className="mb-1 block 2xl:text-lg text-sm font-medium text-bob-search-input-label-color"
									>
										Gender*
									</label>
									<Select>
										<SelectTrigger
											id={`gender-${index}`}
											className="w-full justify-between bg-primary-color data-[placeholder]:text-bob-filters-placeholder-color max-sm:*:data-[slot=select-value]:text-xs"
										>
											<SelectValue placeholder="Choose the gender of the passenger" />
										</SelectTrigger>
										<SelectContent className="w-full">
											<SelectItem value="male">Male</SelectItem>
											<SelectItem value="female">Female</SelectItem>
											<SelectItem value="non-preference">No preference</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							{index < passengerCount - 1 && (
								<Separator className="mt-6 data-[orientation=horizontal]:h-0.5 bg-bob-line-separator-color" />
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
