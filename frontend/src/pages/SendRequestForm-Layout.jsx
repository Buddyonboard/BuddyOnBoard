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
import { useBookings } from '@/context/API/BookingDataProvider';

export default function SendRequestForm() {
	const [submitted, setSubmitted] = useState(false);
	const [copyPrevious, setCopyPrevious] = useState(false);
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
	const [buddyRequestDetails, setBuddyRequestDetails] = useState(
		location.state?.requestDetails || null
	);
	const [serviceType, setServiceType] = useState(
		location.state?.serviceType || null
	);
	const [isEdit, setIsEdit] = useState(location.state?.isEdit || false);

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
	const [selectedFile, setSelectedFile] = useState({});
	const [selectedPicture, setSelectedPicture] = useState({});
	const [formError, setFormError] = useState('');

	/*********************** Get latest bookings ****************************/
	const { bookings } = useBookings();
	const allBookings = [
		...(bookings?.buddy_requests?.courier_buddy_requests || []),
		...(bookings?.buddy_requests?.travel_buddy_requests || [])
	];
	const pendingBookings = allBookings?.filter(
		(item) =>
			item.listingStatus === 'pending' && item.serviceType === `${serviceType}`
	);
	const latestBooking = pendingBookings.sort(
		(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
	)[0];

	/************* To Populate data on click of Copy from previous bookings *************/
	useEffect(() => {
		if (copyPrevious && !isEdit) {
			setBuddyRequestDetails(latestBooking);
		}
	}, [isEdit, copyPrevious, latestBooking]);

	// console.log('buddyDetails >', buddyDetails);
	// console.log('buddyRequestDetails >', buddyRequestDetails);
	// console.log('serviceType >', serviceType);
	// console.log('pendingBookings >', pendingBookings);
	// console.log('latestBooking >', latestBooking);
	// console.log('copyPrevious >', copyPrevious);
	// console.log('isEdit >', isEdit);

	/***************** Edit exisiting buddy request ********************/
	useEffect(() => {
		if (buddyRequestDetails) {
			if (serviceType === 'Travel Buddy') {
				const passengers = buddyRequestDetails.passengers_List.map((p) => ({
					age: p.age,
					gender: p.gender
				}));
				setItems(passengers);
				setPassengerCount(passengers.length);
			} else {
				const courier = buddyRequestDetails.courier_Items_List.map((i) => ({
					itemType: i.itemType,
					weight: i.itemWeight,
					itemPicture: i.itemPicture || null,
					itemDocument: i.itemDocument || null,
					itemDescription: i.itemDescription
				}));

				/***** Pre-fill selected file names (UI display only) *****/
				const selectedPicturePrefill = {};
				const selectedDocumentPrefill = {};

				courier.forEach((item, index) => {
					if (item.itemPicture) {
						selectedPicturePrefill[index] = item.itemPicture.split('-').pop();
					}
					if (item.itemDocument) {
						selectedDocumentPrefill[index] = item.itemDocument.split('-').pop();
					}
				});

				setItems(courier);
				setSelectedPicture(selectedPicturePrefill);
				setSelectedFile(selectedDocumentPrefill);
				setPassengerCount(courier.length);
			}

			/****** Prefill price card ******/
			setTotalAmount(buddyRequestDetails.totalAmount);
		}
	}, [isEdit, buddyRequestDetails, serviceType]);

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

	/************** If No data redirect to landing **************/
	useEffect(() => {
		if (!buddyDetails && !buddyRequestDetails) {
			// Redirect if no data passed
			navigate('/');
		}
	}, [buddyDetails, buddyRequestDetails, navigate]);

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
			let res;

			setSubmitted(true);
			const ServiceSeekerUserId = getuserProfile()._id;
			const requestId = buddyRequestDetails?._id;

			const formData = new FormData();

			/***** Buddy Request form fields *****/
			formData.append(
				'serviceProvider_id',
				buddyDetails?.serviceProviderDetails?.user_Id
			);
			formData.append('serviceSeeker_id', ServiceSeekerUserId);
			formData.append('requestStatus', 'pending');
			formData.append('serviceType', serviceType);
			formData.append('buddyDetails', JSON.stringify(buddyDetails));
			formData.append('totalAmount', JSON.stringify(totalAmount));

			if (serviceType === 'Courier Buddy') {
				formData.append('totalItemsWeight', totalWeight);
			}

			// Attach items dynamically
			Object.keys(items).forEach((key) => {
				const item = items[key];
				if (!isNaN(key)) {
					formData.append(`${key}[age]`, item.age || '');
					formData.append(`${key}[gender]`, item.gender || '');
					formData.append(`${key}[itemType]`, item.itemType || '');
					formData.append(`${key}[weight]`, item.weight || '');
					formData.append(`${key}[itemDescription]`, item.itemDescription || '');

					if (item.itemPicture instanceof File) {
						formData.append(`${key}[itemPicture]`, item.itemPicture);
					}
					if (item.itemDocument instanceof File) {
						formData.append(`${key}[itemDocument]`, item.itemDocument);
					}
				}
			});

			/********** API to Edit Buddy Request data in backend ***********/
			if (isEdit && requestId) {
				res = await axios.post(
					`${API_URL}/edit-buddy-request/${requestId}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				);
			} else {
				/********** API to Upload Buddy Request data in backend ***********/
				res = await axios.post(`${API_URL}/send-buddy-request`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
			}

			/**** Handling API response based on status ****/
			if (res?.status === 201 || res?.status === 200) {
				if (isEdit) {
					navigate('/bookings');
					window.location.reload();
				} else {
					setShowSuccessDialog(true);
				}
				setSubmitted(false);
			} else {
				setSubmitted(false);
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
				{CONST?.sendRequestForm?.sendARequest}
			</h1>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					{/*************** Buddy Info Card ****************/}
					<BuddyInfoCard
						buddyDetails={buddyDetails}
						buddyRequestDetails={buddyRequestDetails}
						serviceType={serviceType}
					/>

					{/**************** Passenger Details Form ****************/}
					<PassengersInfoCard
						passengerCount={passengerCount}
						decrementCount={decrementCount}
						incrementCount={incrementCount}
						serviceType={serviceType}
						setItems={setItems}
						items={items}
						selectedFile={selectedFile}
						setSelectedFile={setSelectedFile}
						selectedPicture={selectedPicture}
						setSelectedPicture={setSelectedPicture}
						copyPrevious={copyPrevious}
						setCopyPrevious={setCopyPrevious}
						isEdit={isEdit}
					/>
				</div>

				{/***************** Price Details Section *****************/}
				<PriceDetailsCard
					buddyDetails={buddyDetails}
					buddyRequestDetails={buddyRequestDetails}
					serviceType={serviceType}
					passengerCount={passengerCount}
					totalWeight={totalWeight}
					formError={formError}
					handleRequestSubmit={handleRequestSubmit}
					items={items}
					setTotalAmount={setTotalAmount}
					submitted={submitted}
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
