const serviceProvider = require('../models/ServiceProviderSchema');
const Users = require('../models/UsersSchema');
const BuddyRequestModal = require('../models/SendRequestSchema');

/************************** Create and Send Buddy Request ******************************/
exports.sendBuddyRequest = async (req, res) => {
	try {
		const {
			serviceProvider_id,
			serviceSeeker_id,
			requestStatus,
			serviceType,
			totalAmount,
			totalItemsWeight,
			buddyDetails,
			...requestDetails
		} = req.body;

		/************ Retreive Service Seeker and Service Provider Details ***********/
		const serviceSeekerDetails = await Users.findById(serviceSeeker_id);
		const serviceProviderDetails = await serviceProvider.findOne({
			user_Id: serviceSeeker_id
		});

		if (!serviceSeekerDetails || !serviceProviderDetails) {
			return res.status(404).json({ message: 'User not found' });
		}

		/************ Extract Request Details **************/
		const parsedItems = Object.keys(requestDetails)
			.filter((key) => !isNaN(key)) // pick only numerical "keys"
			.map((key) => requestDetails[key]);

		/************ Create Base Request Payload to Upload ***************/
		const listingType =
			serviceType === 'Travel Buddy' ? 'travel_listing' : 'courier_listing';

		const baseRequestPayload = {
			serviceType,
			trip_details: buddyDetails?.buddy_Listing_Details?.[listingType] || {},
			listingStatus: requestStatus,
			service_Provider_Details: buddyDetails?.serviceProviderDetails,
			service_Provider_Id: serviceProvider_id,
			totalAmount,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		/***************** Upload the Requested Data to DB *****************/
		let updateQuery = {};

		if (serviceType === 'Travel Buddy') {
			updateQuery = {
				$setOnInsert: {
					service_Seeker_Id: serviceSeeker_id,
					service_Seeker_Details: serviceSeekerDetails
				},
				$push: {
					'buddy_requests.travel_buddy_requests': {
						...baseRequestPayload,
						passengerCount: parsedItems.length.toString(),
						passengers_List: parsedItems.map((item) => ({
							age: item.age,
							gender: item.gender
						}))
					}
				}
			};
		} else if (serviceType === 'Courier Buddy') {
			updateQuery = {
				$setOnInsert: {
					service_Seeker_Id: serviceSeeker_id,
					service_Seeker_Details: serviceSeekerDetails
				},
				$push: {
					'buddy_requests.courier_buddy_requests': {
						...baseRequestPayload,
						totalItemsWeight: totalItemsWeight,
						totalItems: parsedItems.length.toString(),
						courier_Items_List: parsedItems.map((item) => ({
							itemType: item.itemType,
							itemWeight: item.weight,
							itemPicture: item.itemPicture,
							itemDocument: item.itemDocument,
							itemDescription: item.itemDescription
						}))
					}
				}
			};
		}

		const submittedRequestData = await BuddyRequestModal.findOneAndUpdate(
			{ service_Seeker_Id: serviceSeeker_id },
			updateQuery,
			{ upsert: true, new: true }
		);

		return res
			.status(201)
			.json({ message: 'Request sent successfully', data: submittedRequestData });
	} catch (err) {
		return res
			.status(500)
			.json({ error: 'Internal server error', message: err.message });
	}
};
