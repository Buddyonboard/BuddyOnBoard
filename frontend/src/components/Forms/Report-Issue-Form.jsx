import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

import CONST from '@/utils/Constants';
import { CircleCheck, Paperclip } from 'lucide-react';
import MessageAfterSubmit from '../ReUsable/MessageAfterSubmit';
import { Link } from 'react-router-dom';
import PrivacyTermsCheckBox from '../ReUsable/Privacy-Terms-Checkbox';

export default function ReportIssueForm() {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset,
		setValue
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			typeOfIssue: '',
			uploadAttachment: null,
			yourMessage: '',
			requestCallBack: false,
			anonymousTerms: false,
			privacyTerms: false,
			phoneNumber: ''
		}
	});
	const [formError, setFormError] = useState(null);
	const [showInput, setShowInput] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [successMessage, setSuccessMessage] = useState(false);

	// File Validation Function
	const validateFile = (file) => {
		if (!file) return false;
		return true;
	};

	// Uploaded file change function
	const onFileChange = (e, field) => {
		const file = e.target.files?.[0];
		if (validateFile(file)) {
			setSelectedFile(file?.name || null);
			field.onChange(file); // Update react-hook-form state
			setValue('uploadAttachment', file);
		} else {
			setSelectedFile(null);
			field.onChange(null);
			setValue('uploadAttachment', null);
		}
	};

	/* Handling Form submission */
	async function onSubmit(data) {
		// Here you would typically send the data to your API
		await new Promise((resolve) => setTimeout(resolve, 3000));
		console.log('Consoling Data >', data);

		setFormError(null);
		setSuccessMessage(true);
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(); //form reset after submission
			setSelectedFile(null);
		}
	}, [isSubmitSuccessful, reset]);

	/* Handling complete form error */
	function onError() {
		setFormError(CONST.enterAllFields);
	}

	return (
		<>
			{/* Request Form : Before Submission */}
			{!successMessage && (
				<div className="w-full max-w-3xl mx-auto p-6">
					<h1 className="text-xl md:text-3xl font-normal font-merriweather mb-4 md:mb-8">
						{CONST.serviceRequestForm.reportAnIssue}
					</h1>

					<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Full Name Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="fullName"
								>
									{CONST.serviceRequestForm.fullName}
								</label>
								<Controller
									name="fullName"
									id="fullName"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											className="shadow-sm"
											placeholder="Your full name"
											{...field}
										/>
									)}
								/>
							</div>

							{/* Email Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="email"
								>
									{CONST.serviceRequestForm.email}
								</label>
								<Controller
									name="email"
									id="email"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											className="shadow-sm"
											type="email"
											placeholder="Your email"
											{...field}
										/>
									)}
								/>
							</div>
						</div>

						{/* Type of Issue Input */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="typeOfIssue"
								>
									{CONST.serviceRequestForm.typeOfIssue}
								</label>
								<Controller
									name="typeOfIssue"
									id="typeOfIssue"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Select
											onValueChange={(value) => {
												setValue('typeOfIssue', value); //Correctly set the selected value
												field.onChange(value);
											}}
											value={field.value} //Ensure selected value is controlled
										>
											<SelectTrigger className="w-full shadow-sm">
												<SelectValue placeholder="Choose your issue" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Category of Issue</SelectLabel>
													<SelectItem value="Fraudulent activity">
														Fraudulent activity
													</SelectItem>
													<SelectItem value="Safety issue">Safety issue</SelectItem>
													<SelectItem value="Service issue">Service issue</SelectItem>
													<SelectItem value="Others">Others</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
							</div>

							{/* File Attachement Input */}
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="uploadAttachment"
								>
									{CONST.serviceRequestForm.uploadAttachement}
								</label>
								{/* Original Solution */}
								{/* <Controller
									name="uploadAttachment"
									id="uploadAttachment"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<Input
											type="file"
											placeholder="Click to add"
											onChange={(e) => {
												const file = e.target.files[0];
												if (validateFile(file)) {
													// setSelectedFile(file.name);
													setValue('uploadAttachment', file); // ✅ Correct way to set file in state
													field.onChange(file); // Update React Hook Form state
												}
											}}
											ref={field.ref}
											className="shadow-sm"
										/>
									)}
								/> */}

								{/* New Solution */}
								<Controller
									name="uploadAttachment"
									control={control}
									render={({ field }) => (
										<div className="relative">
											<Input
												type="file"
												// accept=".pdf"
												className="hidden"
												id="uploadAttachment"
												onChange={(e) => onFileChange(e, field)}
											/>
											<label
												htmlFor="uploadAttachment"
												className="flex items-center w-full px-4 py-2 border rounded-md cursor-pointer shadow-sm"
											>
												<span
													className={`flex-1 ${
														selectedFile
															? 'text-bob-success-color font-medium'
															: 'text-bob-text-placeholder-color'
													}`}
												>
													{selectedFile ? selectedFile : 'Click to add'}
												</span>
												{selectedFile ? (
													<CircleCheck className="text-bob-success-color" size={18} />
												) : (
													<Paperclip className="text-[#CFCFCF]" size={18} />
												)}
											</label>
										</div>
									)}
								/>
							</div>
						</div>

						{/* Message Input */}
						<div className="flex flex-col">
							<label
								className="font-medium text-sm text-bob-form-label-color"
								htmlFor="yourMessage"
							>
								{CONST.serviceRequestForm.yourMessage}
							</label>
							<Controller
								name="yourMessage"
								id="yourMessage"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<Textarea
										className="shadow-sm"
										placeholder="Type your message here"
										{...field}
									/>
								)}
							/>
						</div>

						{/* Conditionally show phone number Input based on Request call back checkbox */}
						{showInput && (
							<div className="flex flex-col">
								<label
									className="font-medium text-sm text-bob-form-label-color"
									htmlFor="phoneNumber"
								>
									{CONST.serviceRequestForm.phoneNumber}
								</label>
								<Controller
									name="phoneNumber"
									id="phoneNumber"
									control={control}
									rules={{ pattern: /^[0-9]{10}$/g, required: true }}
									render={({ field }) => (
										<Input
											className="shadow-sm"
											placeholder="Your phone number"
											{...field}
										/>
									)}
								/>
								{/**** For future reference ****/}
								{/* {errors.phoneNumber?.type === 'pattern' && (
                    <p className="text-bob-error-color mt-2">
                        Enter Valid Phone Number
                    </p>
                )} */}
							</div>
						)}

						{/* Request Callback Checkbox */}
						<div className="flex flex-row gap-4 items-center">
							<Controller
								name="requestCallBack"
								id="requestCallBack"
								control={control}
								render={({ field }) => (
									<Checkbox
										checked={field.value} //Correctly control checked state
										onCheckedChange={(checked) => {
											setValue('requestCallBack', checked); //Update form state
											setShowInput((prev) => !prev);
											field.onChange(checked);
										}}
										className="border border-bob-outline-color data-[state=checked]:bg-bob-color cursor-pointer"
									/>
								)}
							/>
							<label
								className="font-medium text-sm text-bob-link-placeholder-color"
								htmlFor="requestCallBack"
							>
								{CONST.serviceRequestForm.requestCallBack}
							</label>
						</div>

						{/* Accepting Anonymous Terms Checkbox */}
						<div className="flex flex-row gap-4 items-center">
							<Controller
								name="anonymousTerms"
								id="anonymousTerms"
								control={control}
								render={({ field }) => (
									<Checkbox
										checked={field.value} //Correctly control checked state
										onCheckedChange={(checked) => {
											setValue('anonymousTerms', checked); //Update form state
											field.onChange(checked);
										}}
										className="border border-bob-outline-color data-[state=checked]:bg-bob-color cursor-pointer"
									/>
								)}
							/>
							<label
								className="font-medium text-sm text-bob-link-placeholder-color"
								htmlFor="anonymousTerms"
							>
								{CONST.serviceRequestForm.acceptAnonymousTerms}
							</label>
						</div>

						{/* Accepting Privacy Terms Checkbox */}
						<PrivacyTermsCheckBox
							control={control}
							name="privacyTerms"
							errors={errors}
							setValue={setValue}
							page="forms"
						/>

						{/* Submit button */}
						<Button
							type="submit"
							className="w-full font-semibold text-xl rounded-2xl bg-bob-color hover:bg-blue-700 border-bob-border-color border-2 text-primary-color py-6 cursor-pointer"
							disabled={isSubmitting}
						>
							{CONST.serviceRequestForm.sendMessage}
						</Button>

						{/* If any of the field in the form is not filled then show error */}
						{formError && (
							<p className="text-center text-bob-error-color">{formError}</p>
						)}
					</form>
				</div>
			)}

			{/* Success Message : After Submission */}
			{successMessage && (
				<MessageAfterSubmit
					title={CONST.serviceRequestForm.issueReportSuccessMessageTitle}
					description={CONST.serviceRequestForm.issueReportSuccessMessageContent}
				/>
			)}
		</>
	);
}
