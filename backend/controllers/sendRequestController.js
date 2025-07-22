const serviceProvider = require('../models/ServiceProviderSchema');
const Users = require('../models/UsersSchema');
const BuddyRequestModal = require('../models/SendRequestSchema');
const { getGridFSBucket } = require('../Config/gridFs');

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
			trip_details:
				JSON.parse(buddyDetails)?.buddy_Listing_Details?.[listingType] || {},
			listingStatus: requestStatus,
			service_Provider_Details: JSON.parse(buddyDetails)?.serviceProviderDetails,
			service_Provider_Id: serviceProvider_id,
			totalAmount: JSON.parse(totalAmount),
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
			// const uploadedPicture = req.files?.itemPicture?.[0];
			// const uploadedDocument = req.files?.itemDocument?.[0];

			// updateQuery = {
			// 	$setOnInsert: {
			// 		service_Seeker_Id: serviceSeeker_id,
			// 		service_Seeker_Details: serviceSeekerDetails
			// 	},
			// 	$push: {
			// 		'buddy_requests.courier_buddy_requests': {
			// 			...baseRequestPayload,
			// 			totalItemsWeight: totalItemsWeight,
			// 			totalItems: parsedItems.length.toString(),
			// 			courier_Items_List: parsedItems.map((item) => ({
			// 				itemType: item.itemType,
			// 				itemWeight: item.weight,
			// 				itemPicture: item?.itemPicture?.files?.filename || '',
			// 				itemDocument: item?.itemDocument?.files?.filename || '',
			// 				itemDescription: item.itemDescription
			// 			}))
			// 		}
			// 	}
			// };

			const courierItems = [];
			Object.keys(requestDetails)
				.filter((key) => !isNaN(key))
				.forEach((key) => {
					const item = requestDetails[key] || {};

					const itemPictureField = `${key}[itemPicture]`;
					const itemDocumentField = `${key}[itemDocument]`;

					const itemPictureFile = req.files.find(
						(f) => f.fieldname === itemPictureField
					);
					const itemDocumentFile = req.files.find(
						(f) => f.fieldname === itemDocumentField
					);

					courierItems.push({
						itemType: item.itemType || '',
						itemWeight: item.weight || '',
						itemPicture: itemPictureFile?.filename || '',
						itemDocument: itemDocumentFile?.filename || '',
						itemDescription: item.itemDescription || ''
					});
				});

			updateQuery = {
				$setOnInsert: {
					service_Seeker_Id: serviceSeeker_id,
					service_Seeker_Details: serviceSeekerDetails
				},
				$push: {
					'buddy_requests.courier_buddy_requests': {
						...baseRequestPayload,
						totalItemsWeight,
						totalItems: courierItems.length.toString(),
						courier_Items_List: courierItems
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

/********************* Download Uploaded Courier Files *********************/
exports.downloadBuddyRequestFile = async (req, res) => {
	try {
		const { filename } = req.params;

		const bucket = getGridFSBucket('buddy_request_file_uploads');
		const file = await bucket.find({ filename: filename }).toArray();

		if (!file || file?.length === 0) {
			return res.status(404).json({ message: 'File not found' });
		}

		res.set('Content-Type', file[0].contentType);
		res.set(
			'Content-Disposition',
			'attachment; filename="' + file[0].filename + '"'
		);

		bucket.openDownloadStream(file[0]._id).pipe(res);
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Error retrieving file', error: err.message });
	}
};

/****************** Get Buddy Listings : Service Seeker ********************/
exports.getBookingRequestsBySeekerId = async (req, res) => {
	try {
		const { seekerId } = req.params;

		const bookingRequests = await BuddyRequestModal.findOne({
			service_Seeker_Id: seekerId
		});

		if (!bookingRequests) {
			return res.status(404).json({
				message: 'No bookings found for this service seeker',
				data: null
			});
		}

		res.status(200).json({
			message: 'Data retrieved successfully',
			data: bookingRequests
		});
	} catch (err) {
		console.error('Error fetching booking requests:', err);
		res
			.status(500)
			.json({ error: 'Internal server error', message: err.message });
	}
};

/******************** Update Buddy Request ************************/
exports.updateBuddyRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const {
			serviceSeeker_id,
			serviceType,
			totalAmount,
			totalItemsWeight,
			...requestDetails
		} = req.body;

		/************ Extract Request Details **************/
		const parsedItems = Object.keys(requestDetails)
			.filter((key) => !isNaN(key))
			.map((key) => requestDetails[key]);

		/************** Choose which array field to update *************/
		const arrayName =
			serviceType === 'Travel Buddy'
				? 'buddy_requests.travel_buddy_requests'
				: 'buddy_requests.courier_buddy_requests';

		/************ Prepare the $set object ***********/
		const setObj = {};

		if (serviceType === 'Travel Buddy') {
			(setObj[`${arrayName}.$.passengers_List`] = parsedItems.map((item) => ({
				age: item.age,
				gender: item.gender
			}))),
				(setObj[`${arrayName}.$.passengerCount`] = parsedItems.length.toString()),
				(setObj[`${arrayName}.$.totalAmount`] = JSON.parse(req.body.totalAmount));
			setObj[`${arrayName}.$.updatedAt`] = new Date();
		} else if (serviceType === 'Courier Buddy') {
			const courierItems = [];

			Object.keys(requestDetails)
				.filter((key) => !isNaN(key))
				.forEach((key) => {
					const item = requestDetails[key] || {};

					const itemPictureField = `${key}[itemPicture]`;
					const itemDocumentField = `${key}[itemDocument]`;

					const itemPictureFile = req.files.find(
						(f) => f.fieldname === itemPictureField
					);
					const itemDocumentFile = req.files.find(
						(f) => f.fieldname === itemDocumentField
					);

					courierItems.push({
						itemType: item.itemType || '',
						itemWeight: item.weight || '',
						itemPicture: itemPictureFile?.filename || '',
						itemDocument: itemDocumentFile?.filename || '',
						itemDescription: item.itemDescription || ''
					});
				});

			(setObj[`${arrayName}.$.totalItemsWeight`] = totalItemsWeight),
				(setObj[`${arrayName}.$.totalItems`] = courierItems.length.toString()),
				(setObj[`${arrayName}.$.courier_Items_List`] = courierItems),
				(setObj[`${arrayName}.$.totalAmount`] = JSON.parse(totalAmount)),
				(setObj[`${arrayName}.$.updatedAt`] = new Date());
		}

		const updated = await BuddyRequestModal.findOneAndUpdate(
			{
				service_Seeker_Id: serviceSeeker_id,
				[`${arrayName}._id`]: requestId
			},
			{
				$set: setObj
			},
			{ new: true }
		);

		if (!updated) return res.status(404).json({ message: 'Request not found' });
		return res
			.status(200)
			.json({ message: 'Updated successfully', data: updated });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
