const serviceProvider = require('../models/ServiceProviderSchema');
const Users = require('../models/UsersSchema');
const BuddyRequestModal = require('../models/SendRequestSchema');
const { getGridFSBucket } = require('../Config/gridFs');
const { default: mongoose } = require('mongoose');

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

/****************** Get All Buddy Requests ********************/
exports.getBuddyRequests = async (req, res) => {
	try {
		const allDocuments = await BuddyRequestModal.find({});

		const allRequests = [];

		for (const doc of allDocuments) {
			const seekerDetails = doc.service_Seeker_Details;
			const courier = doc?.buddy_requests?.courier_buddy_requests || [];
			const travel = doc?.buddy_requests?.travel_buddy_requests || [];

			const combined = [...courier, ...travel].map((req) => ({
				...req._doc,
				service_Seeker_Id: doc.service_Seeker_Id,
				service_Seeker_Details: seekerDetails
			}));

			// console.log('combined >', combined);

			allRequests.push(...combined);
		}

		res.status(200).json({
			message: 'Buddy requests retrieved successfully.',
			data: allRequests
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error retrieving buddy requests.',
			error: error.message
		});
	}
};

/****************** Update Buddy Requests Status :: Accept/Reject Req ********************/
exports.updateRequestStatus = async (req, res) => {
	try {
		const { serviceSeekerId, requestId, serviceType, action } = req.body;

		const doc = await BuddyRequestModal.findOne({
			service_Seeker_Id: serviceSeekerId
		});

		if (!doc)
			return res.status(404).json({ message: 'Request document not found' });

		const requestsArray =
			serviceType === 'Courier Buddy'
				? doc.buddy_requests.courier_buddy_requests
				: doc.buddy_requests.travel_buddy_requests;

		const requestIndex = requestsArray.findIndex(
			(r) => r._id.toString() === requestId
		);

		if (requestIndex === -1) {
			return res.status(404).json({ message: 'Buddy request not found' });
		}

		// Get the request object
		const request = requestsArray[requestIndex];

		if (action === 'accepted') {
			request.listingStatus = 'accepted';
			request.updatedAt = new Date();

			await doc.save();
			return res.status(200).json({ message: 'Request accepted' });
		}

		if (action === 'rejected') {
			request.listingStatus = 'rejected';
			request.updatedAt = new Date();

			// Push to previous_requests
			doc.buddy_requests.previous_requests.push(request);

			// Remove from original array
			requestsArray.splice(requestIndex, 1);

			await doc.save();
			return res
				.status(200)
				.json({ message: 'Request rejected and moved to previous_requests' });
		}

		res.status(400).json({ message: 'Invalid action' });
	} catch (error) {
		console.error('Error updating request status:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

/*********************** Cancel Booking By Service Seeker ****************************/
exports.cancelBookingByServiceSeeker = async (req, res) => {
	try {
		const { seekerId, requestId, type, cancellationReason } = req.body;

		if (!['travel_buddy_requests', 'courier_buddy_requests'].includes(type)) {
			return res.status(400).json({ message: 'Invalid request type' });
		}

		const seekerObjectId = new mongoose.Types.ObjectId(seekerId); // service seeker ID
		const requestObjectId = new mongoose.Types.ObjectId(requestId); // request _id

		// Step 1: Find the booking that needs to be cancelled
		const bookingDoc = await BuddyRequestModal.findOne({
			service_Seeker_Id: seekerObjectId,
			[`buddy_requests.${type}._id`]: requestObjectId
		});

		if (
			!bookingDoc ||
			!bookingDoc['buddy_requests'][type] ||
			bookingDoc['buddy_requests'][type].length === 0
		) {
			return res.status(404).json({ message: 'Booking not found' });
		}

		// Extract the booking
		const booking = bookingDoc['buddy_requests'][type][0].toObject();

		// Add cancellation reason + timestamp
		booking.cancellationReason = cancellationReason;
		booking.cancelledAt = new Date();
		booking.listingStatus = 'cancelled';

		// Step 2: Move booking to previous_requests and remove from current list
		await BuddyRequestModal.updateOne(
			{
				service_Seeker_Id: seekerObjectId,
				[`buddy_requests.${type}._id`]: requestObjectId
			},
			{
				$push: { [`buddy_requests.previous_requests`]: booking },
				$pull: { [`buddy_requests.${type}`]: { _id: requestObjectId } }
			}
		);

		res.status(200).json({ message: 'Booking cancelled successfully' });
	} catch (error) {
		console.error('Error cancelling booking:', error);
		res.status(500).json({ message: 'Internal server error' });
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

			/*********** Fetch existing request for File Deletion ************/
			// const existingRequest = await BuddyRequestModal.findOne({
			// 	service_Seeker_Id: serviceSeeker_id,
			// 	[`${arrayName}._id`]: requestId
			// });

			// const existingCourierItems =
			// 	existingRequest?.buddy_requests?.courier_buddy_requests?.find(
			// 		(r) => r._id.toString() === requestId
			// 	)?.courier_Items_List || [];

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

					/******** Delete old file if a new one is uploaded ********/
					// if (itemPictureFile && existingCourierItems[key]?.itemPicture) {
					// 	deleteFileFromGridFS(existingCourierItems[key].itemPicture);
					// }
					// if (itemDocumentFile && existingCourierItems[key]?.itemDocument) {
					// 	deleteFileFromGridFS(existingCourierItems[key].itemDocument);
					// }

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

/************ Helper: Delete a file from GridFS *************/
// const deleteFileFromGridFS = async (filename) => {
// 	try {
// 		const db = mongoose.connection.db;
// 		const bucket = new mongoose.mongo.GridFSBucket(db, {
// 			bucketName: 'buddy_request_file_uploads'
// 		});

// 		const files = await db
// 			.collection('buddy_request_file_uploads.files')
// 			.find({ filename })
// 			.toArray();

// 		for (const file of files) {
// 			await bucket.delete(file._id);
// 			console.log(`✅ Deleted file from GridFS: ${filename}`);
// 		}
// 	} catch (err) {
// 		console.error(`Error deleting file ${filename} from GridFS:`, err);
// 	}
// };
