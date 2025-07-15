import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CONST from '@/utils/Constants';
import BuddyInfoCard from '@/components/SendRequest/BuddyInfo-Card';
import PassengersInfoCard from '@/components/SendRequest/PassengersInfo-Card';
import PriceDetailsCard from '@/components/SendRequest/PriceDetails-Card';
import RequestSubmitPopup from '@/components/SendRequest/RequestSubmit-Popup';
import { getuserProfile } from '@/utils/localStorageHelper';
import axios from 'axios';
import API_URL from '../../environments/Environment-dev';
import { toast } from 'sonner';

export default function SendRequestForm() {
	const [passengerCount, setPassengerCount] = useState(1);
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);
	const [totalAmount, setTotalAmount] = useState({
		totalPrice: 0,
		buddyServiceFee: 0,
		platformFee: 0
	});
	const location = useLocation();
	const navigate = useNavigate();
	const [buddyDetails, setBuddyDetails] = useState(
		location.state?.buddy || null
	);
	const [serviceType, setServiceType] = useState(
		location.state?.serviceType || null
	);

	// console.log('buddyDetails >', buddyDetails);
	// console.log('serviceType >', serviceType);

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

	/********* Validate SendRequest Form Input Details ********/
	function validateFormDetails() {
		const buddyType = serviceType;
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

				if (item.itemType === 'Electronics Open-box-with-invoice') {
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
	const handleRequestSubmit = async () => {
		if (validateFormDetails()) {
			const ServiceSeekerUserId = getuserProfile()._id;

			const payload = {
				serviceProvider_id: buddyDetails?.serviceProviderDetails?.user_Id,
				serviceSeeker_id: ServiceSeekerUserId,
				requestStatus: 'pending',
				serviceType: serviceType,
				totalAmount: totalAmount,
				buddyDetails: buddyDetails,
				...items
			};

			if (serviceType === 'Courier Buddy') {
				payload.totalItemsWeight = totalWeight;
			}

			/**** API to Upload Buddy Request data in backend ****/
			const res = await axios.post(`${API_URL}/send-buddy-request`, payload);

			/**** Handling API response based on status ****/
			if (res?.status === 201) {
				setShowSuccessDialog(true);
			} else {
				toast.warning(CONST.somethingWentWrong, {
					position: 'top-right',
					closeButton: true,
					style: {
						backgroundColor: 'red',
						color: 'white'
					}
				});
			}
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
					<BuddyInfoCard buddyDetails={buddyDetails} serviceType={serviceType} />

					{/**************** Passenger Details Form ****************/}
					<PassengersInfoCard
						passengerCount={passengerCount}
						decrementCount={decrementCount}
						incrementCount={incrementCount}
						serviceType={serviceType}
						setItems={setItems}
						items={items}
					/>
				</div>

				{/***************** Price Details Section *****************/}
				<PriceDetailsCard
					buddyDetails={buddyDetails}
					serviceType={serviceType}
					passengerCount={passengerCount}
					totalWeight={totalWeight}
					formError={formError}
					handleRequestSubmit={handleRequestSubmit}
					items={items}
					setTotalAmount={setTotalAmount}
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
