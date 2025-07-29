const express = require('express');
const {
	getAirports,
	getAllCountries,
	getAllLanguages
} = require('../controllers/dataFetchController');
const {
	userRegistration,
	findUserData
} = require('../controllers/userController');
const {
	serviceRequestUpload,
	getServiceRequests,
	reportIssueUpload,
	getIssueReports
} = require('../controllers/serviceRequestController');
const {
	buddyListingRegistration,
	getBuddyListings,
	deleteBuddyListing,
	editBuddyListing
} = require('../controllers/buddyListingController');
const { searchBuddyListings } = require('../controllers/buddySearchController');
const {
	sendBuddyRequest,
	downloadBuddyRequestFile,
	getBookingRequestsBySeekerId,
	updateBuddyRequest,
	getBuddyRequests,
	updateRequestStatus
} = require('../controllers/sendRequestController');
const {
	service_request_upload,
	buddy_request_upload
} = require('../Middlewares/Upload');

const router = express.Router();

router.get('/airportsList', getAirports);
router.get('/users/:userUid', findUserData);
router.get('/countriesList', getAllCountries);
router.get('/languagesList', getAllLanguages);
router.get('/serviceRequestsList', getServiceRequests);
router.get('/issueReportsList', getIssueReports);
router.get('/getBuddyListings/:user_id', getBuddyListings);
router.get('/search-buddy-listings', searchBuddyListings);
router.get('/booking-requests/:seekerId', getBookingRequestsBySeekerId);
router.get('/get-buddy-requests', getBuddyRequests);
router.get('/buddy-request-download/:filename', downloadBuddyRequestFile);

router.post('/user-registration', userRegistration);
router.post(
	'/service-requests',
	service_request_upload.single('uploadAttachment'),
	serviceRequestUpload
);
router.post(
	'/report-issue',
	service_request_upload.single('uploadAttachment'),
	reportIssueUpload
);
router.post('/buddy-listings-registration', buddyListingRegistration);
router.post('/delete-buddy-listing', deleteBuddyListing);
router.post('/edit-Buddy-Listing', editBuddyListing);
router.post('/update-request-status', updateRequestStatus);
router.post(
	'/send-buddy-request',
	buddy_request_upload.any(),
	// upload.fields([
	// 	{ name: 'itemPicture', maxCount: 1 },
	// 	{ name: 'itemDocument', maxCount: 1 }
	// ]),
	sendBuddyRequest
);
router.post(
	'/edit-buddy-request/:requestId',
	buddy_request_upload.any(),
	updateBuddyRequest
);

module.exports = router;
