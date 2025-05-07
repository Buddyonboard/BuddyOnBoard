import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CONST from '@/utils/Constants';
import BuddyInfoCard from '@/components/SendRequest/BuddyInfo-Card';
import PassengersInfoCard from '@/components/SendRequest/PassengersInfo-Card';
import PriceDetailsCard from '@/components/SendRequest/PriceDetails-Card';
import RequestSubmitPopup from '@/components/SendRequest/RequestSubmit-Popup';

export default function SendRequestForm() {
	const [passengerCount, setPassengerCount] = useState(1);
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const [buddyDetails, setBuddyDetails] = useState(
		location.state?.buddy || null
	);
	const itemList = {
		age: '',
		gender: '',
		itemType: '',
		weight: '',
		itemPicture: '',
		itemDocument: '',
		itemDescription: ''
	};
	const [items, setItems] = useState([{ ...itemList }]);
	const [formError, setFormError] = useState('');

	console.log('items >', items);

	/********* Validate SendRequest Form Input Details ********/
	function validateFormDetails() {
		const buddyType = buddyDetails.user.type;
		const errorMessage = CONST.sendRequestForm.formError;

		if (buddyType === 'Travel Buddy') {
			const isValid = items.every((item) => item.age && item.gender);
			if (!isValid) {
				setFormError(errorMessage);
				return false;
			}
			setFormError('');
			return true;
		}

		if (buddyType === 'Courier Buddy') {
			const isValid = items.every((item) => {
				if (!item.itemType || !item.weight || !item.itemDescription) return false;

				if (item.itemType === 'Open-box-with-invoice') {
					return item.itemDocument;
				}

				if (item.itemType !== 'Documents') {
					return item.itemPicture;
				}

				return true;
			});
			if (!isValid) {
				setFormError(errorMessage);
				return false;
			}
			setFormError('');
			return true;
		}
	}

	/***** Total Weight Of All Courier Items ******/
	const totalWeight = items.reduce(
		(sum, item) => sum + Number(item.weight || 0),
		0
	);

	useEffect(() => {
		if (!buddyDetails) {
			// Redirect if no data passed
			navigate('/');
		}
	}, [buddyDetails, navigate]);

	/***** Handling Increment of Items/Passengers ******/
	const incrementCount = () => {
		if (passengerCount < 3) {
			setPassengerCount((prev) => {
				const newCount = prev + 1;
				setItems((prevItems) => {
					// Only add a new item if current items.length < newCount
					if (prevItems.length < newCount) {
						return [...prevItems, { ...itemList }];
					}
					return prevItems;
				});
				return newCount;
			});
		}
	};

	/***** Handling Decrement of Items/Passengers ******/
	const decrementCount = () => {
		if (passengerCount > 1) {
			// setPassengerCount(passengerCount - 1);
			setPassengerCount((prev) => {
				const newCount = prev - 1;
				setItems((prevItems) => prevItems.slice(0, newCount));
				return newCount;
			});
		}
	};

	/********* Handle Send Request Form Submission ********/
	const handleRequestSubmit = () => {
		if (validateFormDetails()) {
			// console.log('Form filled list >', items);
			setShowSuccessDialog(true);
		} else {
			// console.log('Validation failed');
		}
	};

	return (
		<div className="space-y-6">
			<h1 className="2xl:text-4xl lg:text-3xl md:text-2xl text-xl font-normal font-merriweather text-secondary-color">
				{CONST.sendRequestForm.sendARequest}
			</h1>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					{/*************** Buddy Info Card ****************/}
					<BuddyInfoCard buddyDetails={buddyDetails} />

					{/**************** Passenger Details Form ****************/}
					<PassengersInfoCard
						passengerCount={passengerCount}
						decrementCount={decrementCount}
						incrementCount={incrementCount}
						buddyDetails={buddyDetails}
						setItems={setItems}
						items={items}
					/>
				</div>

				{/***************** Price Details Section *****************/}
				<PriceDetailsCard
					buddyDetails={buddyDetails}
					passengerCount={passengerCount}
					totalWeight={totalWeight}
					formError={formError}
					handleRequestSubmit={handleRequestSubmit}
				/>
			</div>

			<RequestSubmitPopup
				open={showSuccessDialog}
				onClose={() => {
					window.location.reload();
					setShowSuccessDialog(false);
				}}
			/>
		</div>
	);
}
