import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CONST from '@/utils/Constants';
import BuddyInfoCard from '@/components/SendRequest/BuddyInfo-Card';
import PassengersInfoCard from '@/components/SendRequest/PassengersInfo-Card';
import PriceDetailsCard from '@/components/SendRequest/PriceDetails-Card';

export default function SendRequestForm() {
	const [passengerCount, setPassengerCount] = useState(1);
	const location = useLocation();
	const navigate = useNavigate();
	const buddyDetails = location.state?.buddy;

	useEffect(() => {
		if (!buddyDetails) {
			// Redirect if no data passed
			navigate('/');
		}
	}, [buddyDetails, navigate]);

	const decrementPassengers = () => {
		if (passengerCount > 1) {
			setPassengerCount(passengerCount - 1);
		}
	};

	const incrementPassengers = () => {
		if (passengerCount < 3) {
			setPassengerCount(passengerCount + 1);
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
						decrementPassengers={decrementPassengers}
						incrementPassengers={incrementPassengers}
					/>
				</div>

				{/***************** Price Details Section *****************/}
				<PriceDetailsCard
					buddyDetails={buddyDetails}
					passengerCount={passengerCount}
				/>
			</div>
		</div>
	);
}
