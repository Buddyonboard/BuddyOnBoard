const CONST = Object.freeze({
	LANDING: [
		{
			brandName: { name: 'Buddy On Board', href: '/' },
			navSection: [
				{ name: 'Become a buddy', href: '/' },
				{ name: 'How it works', href: '/' },
				{ name: 'About us', href: '/' }
			],
			loginSection: { name: 'Log in', href: '/' }
		}
	],
	lookingFor: 'I am looking for:',
	landingTitle: 'Travel Smarter, Together: Companions & Deliveries Made Easy',
	travelBuddy: 'A Travel Buddy',
	courierBuddy: 'A Courier Buddy',
	travelStressFree: 'Travel Stress-Free with Trusted Buddies',
	matchReliableBuddy:
		'Match with reliable buddies based on specific preferences',
	verifiedTravelBuddy:
		'Travel Buddies are verified through a strict verification process',
	safeJourney: 'Enjoy a safe and stress-free journey with a trusted companion',
	shipmentsMadeEasy: 'Shipments made easy with Courier Buddies',
	verifiedCourierBuddy:
		'Connect with verified Courier Buddies traveling to your destination',
	stayUpdatedAboutDelivery:
		'Stay updated by keeping in touch throughout the delivery',
	costEffectiveCourier:
		'Enjoy a cost-effective and faster alternative to traditional couriers',
	howItWorks: 'Know how it all works',
	planYourJourney: 'Plan Your Journey',
	enterTravelDetails:
		'Enter your travel details, including destination and dates, to find a travel companion heading your way.',
	matchAndConnect: 'Match and Connect',
	browseVerifiedProfiles:
		'Browse verified profiles and choose a companion that meets your preferences. Send a request, complete the payment, and finalize your plans.',
	travelTogether: 'Travel Together',
	meetYourCompanion:
		"Meet your companion, travel with ease, and make your trip both comfortable and enjoyable with the assurance of Buddy On board's verified community.",
	findCourierBuddy: 'Find a Courier Buddy',
	sharePackageDetails:
		'Share your package details including the pictures and discover verified travelers heading to your destination.',
	connectAndConfirm: 'Connect and Confirm',
	confirmCourierBuddy:
		'Confirm your Courier Buddy, complete the payment, and finalize the courier arrangement.',
	receiveUpdates: 'Receive Updates',
	stayInformedWithUpdates:
		'Stay informed with updates from the traveler until your package is safely delivered.',
	FAQ: [
		{
			productMission:
				'Our mission is to make travel simpler, safer, and more convenient for you and your loved ones!',
			travelersJoined: '500+ travelers have already joined us!',
			someFaq: 'Some frequently asked questions',
			exploreMoreFaq: 'Explore more FAQs',
			generalPlatformFaq: [
				{
					title: 'What is Buddy On Board?',
					description:
						'Buddy On Board is a platform that connects travelers with trusted companions or courier buddies to make travel stress-free and convenient. Whether you’re seeking a travel buddy or need to send items with a verified traveler, our platform ensures safety, flexibility, and peace of mind.'
				},
				{
					title: 'How does Buddy On Board ensures user safety?',
					description:
						'All users are verified through a secure identity verification process using government-issued IDs. This ensures that everyone offering Buddy Services on the platform is thoroughly vetted.'
				},
				{
					title: 'Is Buddy On Board available globally?',
					description:
						'While we aim for a global reach, our platform is currently available for travelers and senders in North America and Asia. You can connect with Travel Buddies or Courier Buddies traveling to or from your desired destination within these two continents.'
				},
				{
					title: 'Do I need to pay to use the platform?',
					description:
						'Creating an account and browsing profiles is free. However, services such as finding a Travel Buddy or a Courier Buddy involve service fees.'
				},
				{
					title: 'How do I find a travel companion?',
					description:
						'Simply input your travel details, such as destination and dates, and browse verified profiles. Use filters to match with companions based on preferences like language and gender.'
				},
				{
					title: 'Can I choose a companion based on my preferences?',
					description:
						'Yes, our platform allows you to filter companions based on your specific preferences such as language and gender, ensuring a comfortable and flexible travel experience.'
				},
				{
					title: 'What happens after I narrow down my search for travel companions?',
					description:
						'After narrowing your search, you can send requests to multiple travel companions of your choice. If a Travel Buddy accepts your request, you will receive notifications through the app and via email.'
				},
				{
					title: 'What happens after I match with a travel companion?',
					description:
						'Once your request is accepted, payment button will be enabled in the Travel Buddy’s profile. After the payment is completed, you can coordinate directly through our in-app messaging system to plan your journey.'
				},
				{
					title: 'What if my plans change after booking a travel companion?',
					description:
						'You can cancel your booking and search for a new Travel Buddy based on your updated travel plans. We charge a flat cancellation fee of USD 10 or CAD 13 and refund the remaining balance to your original payment method.'
				},
				{
					title: 'How does the Courier Buddy service work?',
					description:
						"To get started, enter your courier details and search for verified Courier Buddies heading to your destination. You can send requests to multiple buddies at once. Once you find a match, the payment button will be activated in the selected buddy's profile. After completing the payment, you can coordinate directly through our in-app messaging system to finalize the details."
				},
				{
					title: 'What types of items can I send through Courier Buddy?',
					description:
						"You are allowed to send documents and permissible items as per our platform's guidelines. Restricted or prohibited items are not allowed."
				},
				{
					title: 'How do I ensure my item is delivered safely?',
					description:
						'We connect you with verified travelers, and you can stay in touch with them throughout the delivery process for real-time updates.'
				},
				{
					title: 'Is there a weight or size limit for items?',
					description:
						"Yes, weight and size restrictions may apply depending on the traveler or courier buddy's capacity. Ensure you communicate and agree on these details with the traveler before finalizing."
				},
				{
					title: 'What if my item is lost or damaged during delivery?',
					description:
						'While we strive to connect you with trusted and verified travelers, Buddy On Board (the platform) does not take ownership or liability for items lost or damaged during delivery. Both parties are encouraged to communicate clearly, agree on terms, and assume responsibility for the item throughout the process. We recommend discussing precautions with the traveler to ensure safe handling and delivery.'
				},
				{
					title: 'How do I make a payment?',
					description:
						'Payments can be securely made through the platform using our integrated payment gateway. We accept major credit cards and other popular payment methods.'
				},
				{
					title: 'Are payments refundable?',
					decription:
						'Refunds are applicable in specific situations, such as cancellations made within 48 hours before the journey or for courier shipments. Please refer to our refund policy for more details.'
				},
				{
					title: 'Are there additional charges for using the platform?',
					description:
						'Creating an account and browsing profiles are free. However, services such as finding a Travel Buddy or a Courier Buddy involve service and platform fees. When requesting a buddy service, these details will be displayed transparently.'
				},
				{
					title: 'What if I have an issue with my booking or delivery?',
					description:
						"Our support team is here to help. You can reach out to us through the 'Contact Us' section for assistance with any issues or disputes."
				},
				{
					title: 'Can I report a user if I feel unsafe?',
					description:
						'Yes, you can report any user or suspicious activity directly within the platform. We take such reports seriously and will investigate promptly.'
				},
				{
					title: 'How do I get started?',
					description:
						'Simply create an account, explore our services, request a Travel Buddy or Courier Buddy, complete your booking, coordinate with your buddy, and enjoy a stress-free, convenient travel or courier experience.'
				}
			],
			buddiesFaq: [
				{
					title: 'Who can become a Travel Buddy?',
					description:
						'Anyone who is a verified user on the platform and is willing to assist fellow travelers can become a Travel Buddy. This opportunity allows users to earn money while traveling.'
				},
				{
					title: 'What are my responsibilities as a Travel Buddy?',
					description:
						'As a Travel Buddy, your primary responsibility is to provide companionship and assistance to the traveler. This may include helping with communication, navigating airports and terminals, managing immigration and customs, or simply offering companion support during the journey.'
				},
				{
					title: 'Can I choose whom to travel with?',
					description:
						'Yes, you have the option to review the requests from travelers and accept those that fit your preferences.'
				},
				{
					title: 'Do I get paid as a Travel Buddy?',
					description:
						'Yes, Travel Buddies get compensated for their time and assistance. Payment will be processed securely through the platform after the successful completion of the trip.'
				},
				{
					title: 'What if my plans change after accepting a travel request?',
					description:
						"You must notify the traveler as soon as possible through the platform's messaging system. Since it raises concerns for travelers seeking companions, the platform allows up to two cancellations for valid reasons."
				},
				{
					title: "Am I responsible for the traveler's safety or belongings?",
					description:
						"No, you are not responsible for the traveler's safety or belongings. Your role is to assist and support, not to take liability for personal or security matters."
				},
				{
					title: 'Who can become a Courier Buddy?',
					description:
						'Any verified traveler who is willing to carry permissible items to their destination can become a Courier Buddy.'
				},
				{
					title: 'What kind of items am I allowed to carry?',
					description:
						'You can carry documents and permissible items only. Restricted or prohibited items are not allowed and you have to accept 100% liability in the event of an issue with the Law Enforcement, Airlines, or Immigration authorities.'
				},
				{
					title: 'How much can I earn as a Courier Buddy?',
					description:
						"Earnings depend on the size, weight, and type of item being delivered. As a Buddy, you can consult our price chart to quote for the shipment request. If you need help determining a rate, the platform can assist you. In case of any discrepancies, we recommend accepting or negotiating before finalizing the customer's request."
				},
				{
					title: 'What are my responsibilities as a Courier Buddy?',
					description:
						'As a Courier Buddy, you are responsible for safely transporting the item to the agreed destination and maintaining communication with the sender until delivery is complete.'
				},
				{
					title: 'What if the item is lost or damaged during delivery?',
					description:
						'Both the sender and the courier must assume full responsibility for the item. Buddy On Board does not take ownership or liability for any loss or damage. We recommend clearly agreeing on the terms and ensuring proper handling of the item.'
				},
				{
					title: 'Can I decline a delivery request?',
					description:
						'Yes, you can choose which delivery requests to accept. You are under no obligation to accept every request.'
				},
				{
					title: 'Do I need to meet the sender in person?',
					description:
						'Yes, both the pickup and drop-off arrangements are made between you and the sender, ensuring clear communication through the platform.'
				},
				{
					title: 'How do I handle questions about permissible items or legalities?',
					description:
						'You can always refer to the guidelines for permissible items on the destination country’s Customs websites or take advantage of the free legal consultation services available on the platform for Courier Buddies.'
				}
			]
		}
	],
	footerSection: [
		{
			navigationLink: [
				{
					name: 'How it works',
					href: '/'
				},
				{
					name: 'About Us',
					href: '/'
				},
				{
					name: 'Report issue',
					href: '/'
				},
				{
					name: 'Submit Service Request',
					href: '/'
				},
				{
					name: 'Help',
					href: '/'
				}
			],
			privacyPolicy: [
				{
					name: 'Privacy Policy',
					href: '/'
				},
				{
					name: 'Terms of Use',
					href: '/'
				},
				{
					name: 'Cookies Settings',
					href: '/'
				}
			],
			tradeMark:
				'Buddy on board. All rights reserved. Trademark registration in progress.'
		}
	]
});

export default CONST;
