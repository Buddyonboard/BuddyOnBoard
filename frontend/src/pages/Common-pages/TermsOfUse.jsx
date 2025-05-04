export default function TermsOfUse() {
	return (
		<div className="md:px-6 px-2 py-4">
			<h1 className="font-bold md:text-5xl text-4xl">Terms of Use</h1>
			<br />
			<p>
				<strong>Effective Date:</strong> 01 March, 2025
			</p>
			<br />
			<p>
				Welcome to <strong>Buddyonboard</strong> (also referred to as “BOB,”
				“Buddyonboard.co,” or the “Platform”). By accessing or using Buddyonboard,
				you agree to comply with and be bound by the following legally enforceable
				terms and conditions. If you do not agree with these Terms of Use, please
				refrain from using our Platform.
			</p>

			<br />
			{/* Part 1 */}
			<div>
				<h2 className="text-2xl font-bold mb-4">1. About Buddyonboard</h2>
				<div>
					<p className="mb-4">
						Buddyonboard operates a peer-to-peer business model that connects Service
						Providers and Service Seekers to facilitate two primary services:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Travel Buddy Service:</strong> Connecting users to travel
							companions for assistance with communication, navigating airports,
							security, immigration, customs, and other transit-related support for a
							nominal fee.
						</li>
						<li>
							<strong>Courier Buddy Service:</strong> Enabling users to send
							non-sensitive documents or permissible items through verified travelers
							heading to the same or nearby destinations.
						</li>
					</ul>
				</div>
			</div>

			<br />
			{/* Part 2 */}
			<div>
				<h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
				<div>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Service Provider:</strong> A verified traveler offering travel
							assistance (Travel Buddy) or courier services (Courier Buddy)
						</li>
						<li>
							<strong>Service Seeker:</strong> A user looking for travel assistance
							(Travel Buddy) or to send items (Courier Buddy ).
						</li>
						<li>
							<strong>Platform:</strong> Refers to Buddyonboard, including its website,
							mobile applications, and services.
						</li>
					</ul>
				</div>
			</div>

			<br />
			{/* Part 3 */}
			<div>
				<h2 className="text-2xl font-bold mb-4">3. User Obligations</h2>
				{/* 3.1 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">3.1 General Obligations</h3>
					<p className="mb-4">All users must:</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Provide accurate and truthful information during registration and service
							use.
						</li>
						<li>
							Comply with all applicable laws, regulations, airline and customs rules.
						</li>
						<li>
							All users - ‘sender and carrier’ or ‘service provider and service seeker’
							using or offering the ‘Courier Buddy’ service must ensure that shipments
							or couriered items comply with the laws and regulations of the source and
							destination countries. This includes proper documentation, declarations,
							payment of duties and taxes, and adherence to import/export restrictions.
						</li>
						<li>
							All users are mandated to refer to the latest regulations from the
							following websites if bringing items into Canada or U.S.
							<br />
							<a
								href="https://www.tsa.gov/travel/security-screening/whatcanibring/all"
								className="text-bob-color"
								target="_blank"
							>
								https://www.tsa.gov/travel/security-screening/whatcanibring/all
							</a>
							<br />
							<a
								href="https://www.cbsa-asfc.gc.ca/travel-voyage/bgb-rmf-eng.html"
								className="text-bob-color"
								target="_blank"
							>
								https://www.cbsa-asfc.gc.ca/travel-voyage/bgb-rmf-eng.html
							</a>
						</li>
						<li>
							Service providers or Courier Buddies (travelers offering to carry items)
							must adhere to airline luggage and prohibited items regulations.
						</li>
						<li>
							Users are responsible for ensuring the legality and safety of items being
							transported. Any failure to do so may result in account suspension or
							legal consequences.
						</li>
					</ul>
				</div>

				<br />

				{/* 3.2 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">
						3.2 Additional Compliance Requirements
					</h3>
					<p className="mb-4">
						For users participating in the Courier Buddy Service:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Users must ensure that the items being transported comply with the
							requirements of Federal Law Enforcement Agencies such as - Transport
							Canada’s Air Cargo Security Program, U.S. Customs and Border Protection
							(CBP)’s Advance Air Cargo Screening requirements, and any relevant import
							laws and regulations of the destination country.
						</li>
						<li>
							Users must not transport items prohibited by the Canada Border Services
							Agency (CBSA), U.S. Customs and Border Protection or any equivalent
							foreign authority for international shipments.
						</li>
						<li>
							Travelers offering courier services must declare transported items at
							customs when crossing international borders and comply with all customs
							and import/export regulations.
						</li>
					</ul>
				</div>

				<br />

				{/* 3.3 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">3.3 Prohibited Activities</h3>
					<p className="mb-4">Users are prohibited from engaging in:</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Shipping or sending hazardous materials, illegal, banned, or prohibited
							items.
						</li>
						<li>Misrepresenting themselves or creating fraudulent profiles.</li>
						<li>
							Using the platform for money laundering, fraud, or other illicit
							activities.
						</li>
					</ul>
				</div>

				<br />

				{/* 3.4 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">
						3.4 Verification and Inspection
					</h3>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Service Providers are responsible for visually inspecting and verifying
							the items they agree to transport.
						</li>
						<li>
							Service Providers must ensure they are not carrying items that violate
							airline, customs, or legal regulations. If there is any doubt, they must
							reject the item.
						</li>
						<li>
							The Platform assumes no responsibility for issues with law enforcement,
							customs, border protection, or airlines arising from transported items.
						</li>
					</ul>
				</div>
			</div>

			<br />
			{/* Part 4 */}
			<div>
				<h2 className="text-2xl font-bold mb-4">
					4. Platform Role and Limitations
				</h2>
				{/* 4.1 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">4.1 Intermediary Role </h3>
					<p className="mb-4">
						Buddyonboard acts solely as an intermediary between Service Providers and
						Service Seekers. The Platform does not:{' '}
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Verify the legality, authenticity, or safety of items transported.
						</li>
						<li>
							Guarantee the completion of services or enforce agreements between users.
						</li>
					</ul>
				</div>

				<br />

				{/* 4.2 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">4.2 Liability Disclaimers </h3>

					<ul className="list-disc pl-6 space-y-2">
						<li>
							Buddyonboard assumes no liability for lost or damaged items during the
							Courier Buddy service.
						</li>
						<li>
							The Platform will investigate and may suspend the account of a user at
							fault but assumes no liability in disputes between users.
						</li>
					</ul>
				</div>

				<br />

				{/* 4.3 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">
						4.3 Additional Safety Measures{' '}
					</h3>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							The Platform reserves the right to introduce verification protocols, such
							as background checks or item audits, to enhance the safety of the Courier
							Buddy Service
						</li>
						<li>
							Users must immediately report suspicious or illegal activities involving
							the Platform’s services
						</li>
						<li>
							The platform reserves the right to suspend user accounts or registration
							processes without notice in cases of:
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>Fraudulent activity.</li>
								<li>Misconduct or harmful intentions.</li>
								<li>Incomplete or failed background checks.</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>

			<br />
			{/* Part 5 */}
			<div>
				<h2 className="text-2xl font-bold mb-4">5. Fees and Payments</h2>
				{/* 5.1 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">5.1 Service Fees</h3>
					<p className="mb-4">
						The Platform charges a nominal fee for its intermediary services. Specific
						fees will be displayed before completing any transaction.
					</p>
				</div>

				<br />

				{/* 5.2 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">5.2 Payment Handling</h3>
					<p className="mb-4">
						Payments between Service Providers and Service Seekers will be facilitated
						by the Platform using secure third-party payment gateways. Users agree to
						comply with all payment terms.
					</p>
				</div>
			</div>

			<br />
			{/* Part 6 */}
			<div>
				<h2 className="text-2xl font-bold mb-4">6. Privacy and Data Protection</h2>
				<p className="mb-4">
					Your use of Buddyonboard is subject to our Privacy Policy, which governs
					how we collect, use, and protect your personal information. By using the
					Platform, you consent to these practices.
				</p>
			</div>

			<br />
			{/* Part 7 */}
			<div>
				<h2 className="text-2xl font-bold mb-4">7. Dispute Resolution</h2>
				{/* 7.1 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">7.1 Between Users </h3>
					<p className="mb-4">
						Users are encouraged to resolve disputes independently. The Platform may
						assist in facilitating communication but does not guarantee resolution.
					</p>
				</div>

				<br />

				{/* 7.2 */}
				<div>
					<h3 className="text-xl font-semibold mb-2">7.2 Governing Law </h3>
					<p className="mb-4">
						These Terms of Use shall be governed by the laws of Ontario, Canada.
					</p>
				</div>
			</div>

			<br />
			{/* Part 8 */}
			<div>
				<h2 className="text-2xl font-bold mb-4">8. Modifications to Terms</h2>
				<p className="text-gray-700">
					Buddyonboard reserves the right to update or modify these Terms of Use at
					any time. Users will be notified of significant changes, and continued use
					of the Platform constitutes acceptance of the revised Terms.
				</p>
			</div>

			<br />
			{/* Part 9 */}
			<div>
				<h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
				<p className="text-gray-700">
					If you have any questions about these Terms of Use, please contact by:
				</p>
				<ul className="list-disc pl-6 space-y-2">
					<li>Submitting a Service Request</li>
					<li>Email: support@buddyonboard.co</li>
				</ul>
			</div>

			<br />

			<strong>
				By using Buddyonboard, you acknowledge that you have read, understood, and
				agreed to these Terms of Use.
			</strong>
		</div>
	);
}
