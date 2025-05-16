import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';

export default function PrivacyTermsCheckBox({
	control,
	name,
	errors,
	setValue,
	page
}) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-4 items-center">
				<Controller
					name={name}
					id={name}
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<Checkbox
							checked={field.value} //Correctly control checked state
							onCheckedChange={(checked) => {
								setValue(`${name}`, checked); //Update form state
								field.onChange(checked);
							}}
							className="border border-bob-outline-color data-[state=checked]:bg-bob-color cursor-pointer"
						/>
					)}
				/>
				<label
					className="font-medium text-sm text-bob-link-placeholder-color"
					htmlFor={name}
				>
					{page === 'forms' && (
						<>
							The above information will be processed based on our{' '}
							<Link
								to="/terms-of-use"
								className="text-bob-update-password-link-color font-bold"
							>
								Terms of Use
							</Link>{' '}
							and{' '}
							<Link
								to="/privacy-policy"
								className="text-bob-update-password-link-color font-bold"
							>
								Privacy Policy
							</Link>
							.
						</>
					)}

					{page === 'userRegistration' && (
						<>
							I have read and agree to the{' '}
							<Link
								to="/terms-of-use"
								className="text-bob-update-password-link-color font-bold"
							>
								Terms of Use
							</Link>{' '}
							and{' '}
							<Link
								to="/privacy-policy"
								className="text-bob-update-password-link-color font-bold"
							>
								Privacy Policy
							</Link>
							. I understand that agreeing to the Terms is required to complete my
							registration and use the services.'
						</>
					)}
				</label>
			</div>
			{errors?.privacyTerms?.type === 'required' && (
				<p className="text-center text-bob-error-color">
					{page === 'forms' && (
						<>
							Please confirm your acknowledgment of our Terms of Use and Privacy Policy
							by checking the box.
						</>
					)}
					{page === 'userRegistration' && (
						<>Please accept the terms of service to confirm registration.</>
					)}
				</p>
			)}
		</div>
	);
}
