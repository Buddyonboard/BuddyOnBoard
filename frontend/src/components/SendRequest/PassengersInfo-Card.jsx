import { CircleCheck, Minus, Paperclip, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import CONST from '@/utils/Constants';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';

export default function PassengersInfoCard({
	passengerCount,
	decrementCount,
	incrementCount,
	serviceType,
	setItems,
	items
}) {
	const [selectedFile, setSelectedFile] = useState({});
	const [selectedPicture, setSelectedPicture] = useState({});

	// File Validation Function
	const validateFile = (file) => {
		if (!file) return false;
		return true;
	};

	/******** Handle Item Document Change ********/
	const onFileChange = (index, e) => {
		const file = e.target.files?.[0];
		if (validateFile(file)) {
			setSelectedFile((prev) => ({ ...prev, [index]: file.name }));
			setItems((prevItems) =>
				prevItems.map((item, i) =>
					i === index ? { ...item, itemDocument: file } : item
				)
			);
		} else {
			setSelectedFile((prev) => ({ ...prev, [index]: null }));
		}
	};

	/******** Handle Item Picture Change ********/
	const onPictureChange = (index, e) => {
		const file = e.target.files?.[0];
		if (validateFile(file)) {
			setSelectedPicture((prev) => ({ ...prev, [index]: file.name }));
			setItems((prevItems) =>
				prevItems.map((item, i) =>
					i === index ? { ...item, itemPicture: file } : item
				)
			);
		} else {
			setSelectedPicture((prev) => ({ ...prev, [index]: null }));
		}
	};

	/******** Handle Age Input Change ********/
	const handleAgeChange = (index, value) => {
		setItems((prevItems) =>
			prevItems.map((item, i) => (i === index ? { ...item, age: value } : item))
		);
	};

	/******** Handle Gender Dropdown Change ********/
	const handleGenderChange = (index, value) => {
		setItems((prevItems) =>
			prevItems.map((item, i) => (i === index ? { ...item, gender: value } : item))
		);
	};

	/******** Handle Weight Input Change ********/
	const handleWeightChange = (index, value) => {
		setItems((prevItems) =>
			prevItems.map((item, i) => (i === index ? { ...item, weight: value } : item))
		);
	};

	/******** Handle Item Dropdown Change ********/
	const handleItemTypeChange = (index, value) => {
		setItems((prevItems) =>
			prevItems.map((item, i) =>
				i === index ? { ...item, itemType: value } : item
			)
		);
	};

	/******** Handle Description Input Change ********/
	const onDescriptionChange = (index, value) => {
		setItems((prevItems) =>
			prevItems.map((item, i) =>
				i === index ? { ...item, itemDescription: value } : item
			)
		);
	};

	return (
		<Card className="overflow-hidden rounded-2xl shadow-xl">
			<CardContent>
				<h2 className="mb-6 2xl:text-2xl text-xl font-semibold text-bob-accordion-content-color">
					{CONST.sendRequestForm.addYourDetails}
				</h2>

				<div className="space-y-6">
					<div>
						{/*********** Passenger/Items Addition/Substraction ********/}
						<div className="flex items-center justify-between">
							{/***** Number of Passenger/Items Allowed *****/}
							<div>
								<p className="font-medium text-base 2xl:text-xl">
									{serviceType === 'Travel Buddy'
										? CONST.sendRequestForm.totalPassengers
										: CONST.sendRequestForm.totalItems}
								</p>
								<p className="2xl:text-base md:text-sm text-xs font-normal text-[#A8A8A8] mt-1">
									{serviceType === 'Travel Buddy'
										? CONST.sendRequestForm.passengersAllowed
										: CONST.sendRequestForm.itemsAllowed}
								</p>
							</div>

							{/***** Handling Number of Passengers/Items ******/}
							<div className="flex items-center gap-3">
								<Button
									variant="outline"
									size="icon"
									className="rounded-full"
									onClick={decrementCount}
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
									onClick={incrementCount}
									disabled={passengerCount >= 3}
								>
									<Plus className="size-4" />
								</Button>
							</div>
						</div>
					</div>

					{/********** Number Of Passengers and Details *************/}
					{serviceType === 'Travel Buddy' &&
						Array.from({ length: passengerCount }).map((_, index) => (
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
											type="text"
											maxLength={2}
											// value={items[index].age}
											placeholder="Enter the age of the passenger"
											className="w-full"
											onChange={(e) => {
												if (/^\d*$/.test(e.target.value)) {
													handleAgeChange(index, e.target.value);
												} else {
													handleAgeChange(index, '');
												}
											}}
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
										<Select
											// value={items[index].gender} // current item type from state
											onValueChange={(value) => handleGenderChange(index, value)}
										>
											<SelectTrigger
												id={`gender-${index}`}
												className="w-full justify-between bg-primary-color data-[placeholder]:text-bob-filters-placeholder-color max-sm:*:data-[slot=select-value]:text-xs"
											>
												<SelectValue placeholder="Choose the gender of the passenger" />
											</SelectTrigger>
											<SelectContent className="w-full">
												<SelectItem value="male">Male</SelectItem>
												<SelectItem value="female">Female</SelectItem>
												<SelectItem value="no-preference">No preference</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								{index < passengerCount - 1 && (
									<Separator className="mt-6 data-[orientation=horizontal]:h-0.5 bg-bob-line-separator-color" />
								)}
							</div>
						))}

					{/****************** Items Details ******************/}
					{serviceType === 'Courier Buddy' &&
						Array.from({ length: passengerCount }).map((_, index) => (
							<div key={index}>
								<div className="flex flex-col">
									{/************** Item Details Fields **************/}
									<div className="grid gap-4 2xl:grid-cols-4 md:grid-cols-3">
										{/**** Choose an Item Dropdown ****/}
										<div>
											<label
												htmlFor={`item-${index}`}
												className="mb-1 block 2xl:text-lg text-sm font-medium text-bob-search-input-label-color"
											>
												Choose an item*
											</label>
											<Select
												// value={items[index].itemType}
												onValueChange={(value) => handleItemTypeChange(index, value)}
											>
												<SelectTrigger
													className="w-full justify-between bg-primary-color data-[placeholder]:text-bob-filters-placeholder-color max-sm:*:data-[slot=select-value]:text-xs"
													id={`item-${index}`}
												>
													<SelectValue placeholder="Courier item" />
												</SelectTrigger>

												<SelectContent className="w-full">
													<SelectItem value="Documents">Documents</SelectItem>
													<SelectItem value="Clothes">Clothes</SelectItem>

													{/* Grouped Electronics Sub-options */}
													<SelectGroup>
														<SelectLabel className="font-bold text-bob-form-label-color text-base">
															Electronics
														</SelectLabel>
														<SelectItem value="Electronics Open-box-with-invoice">
															Open box with invoice
														</SelectItem>
														<SelectItem value="Electronics Open-box-without-invoice">
															Open box without invoice
														</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</div>

										{/**** Item Weight Input ****/}
										<div>
											<label
												htmlFor={`itemWeight-${index}`}
												className="mb-1 block 2xl:text-lg text-sm font-medium text-bob-search-input-label-color"
											>
												Approximate weight in grams*
											</label>
											<Input
												id={`itemWeight-${index}`}
												placeholder="Courier item weight"
												className="w-full"
												// value={items[index].weight}
												maxLength={5}
												onChange={(e) => {
													if (/^\d*$/.test(e.target.value)) {
														handleWeightChange(index, e.target.value);
													} else {
														handleWeightChange(index, '');
													}
												}}
											/>
										</div>

										{/**** Item Picture Input ****/}
										{items[index].itemType !== 'Documents' && (
											<div>
												<label className="mb-1 block 2xl:text-lg text-sm font-medium text-bob-search-input-label-color">
													Upload pictures*
												</label>
												<Input
													type="file"
													accept=".jpg,.jpeg,.png"
													className="hidden"
													id={`itemPicture-${index}`}
													onChange={(e) => onPictureChange(index, e)}
												/>
												<label
													htmlFor={`itemPicture-${index}`}
													className="flex items-center w-full px-4 py-2 border rounded-md cursor-pointer shadow-sm"
												>
													<span
														className={`flex-1 truncate ${
															selectedPicture[index]
																? 'text-bob-success-color font-medium'
																: 'text-bob-text-placeholder-color'
														}`}
													>
														{selectedPicture[index] ? selectedPicture[index] : 'Click to add'}
													</span>
													{selectedPicture[index] ? (
														<CircleCheck className="text-bob-success-color" size={18} />
													) : (
														<Paperclip className="text-[#CFCFCF]" size={18} />
													)}
												</label>
											</div>
										)}

										{/**** Item Document/Invoice Input -  ****/}
										{items[index].itemType === 'Electronics Open-box-with-invoice' && (
											<div>
												<label className="mb-1 block 2xl:text-lg text-sm font-medium text-bob-search-input-label-color">
													Upload Invoice/Documentation*
												</label>
												<Input
													type="file"
													accept=".pdf"
													className="hidden"
													id={`itemDocument-${index}`}
													onChange={(e) => onFileChange(index, e)}
												/>
												<label
													htmlFor={`itemDocument-${index}`}
													className="flex items-center w-full px-4 py-2 border rounded-md cursor-pointer shadow-sm"
												>
													<span
														className={`flex-1 truncate ${
															selectedFile[index]
																? 'text-bob-success-color font-medium'
																: 'text-bob-text-placeholder-color'
														}`}
													>
														{selectedFile[index] ? selectedFile[index] : 'Click to add'}
													</span>
													{selectedFile[index] ? (
														<CircleCheck className="text-bob-success-color" size={18} />
													) : (
														<Paperclip className="text-[#CFCFCF]" size={18} />
													)}
												</label>
											</div>
										)}
									</div>

									{/************** Item Description Field **************/}
									<div className="mt-5">
										<label
											htmlFor={`description-${index}`}
											className="mb-1 block 2xl:text-lg text-sm font-medium text-bob-search-input-label-color"
										>
											Add a description*
										</label>
										<Textarea
											id={`description-${index}`}
											placeholder="Type your message here"
											className="w-full"
											value={items[index].itemDescription}
											onChange={(e) => onDescriptionChange(index, e.target.value)}
										/>
									</div>
								</div>

								{/******* Separator ******/}
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
