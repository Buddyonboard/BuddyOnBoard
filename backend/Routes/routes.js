const express = require('express');
const {
	getAirports,
	getAllCountries,
	getAllLanguages
} = require('../controllers/dataFetchController');
const {
	userRegistration,
	findUserData,
	getServiceProviderByUid
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
	updateRequestStatus,
	cancelBookingByServiceSeeker
} = require('../controllers/sendRequestController');
const {
	service_request_upload,
	buddy_request_upload
} = require('../Middlewares/Upload');
const { createCheckoutSession } = require('../controllers/paymentController');
const { openStripe } = require('../controllers/stripeConnectController');
const { handleDecision } = require('../Webhooks/veriffWebhook');
const { startVerification } = require('../controllers/veriffController');

const router = express.Router();

router.get('/airportsList', getAirports);
router.get('/users/:userUid', findUserData);
router.get('/service-provider/:userUid', getServiceProviderByUid);
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
router.post('/payment/create-checkout-session', createCheckoutSession);
router.post('/cancel-booking-seeker', cancelBookingByServiceSeeker);
router.post('/open-stripe', openStripe);

router.get('/veriff/webhook', async (req, res) => {
	// Veriff redirects user here after completion
	// The sessionId is passed as a query param
	const sessionId = req.query.sessionId;
	let status = 'pending'; // default to pending if we can't determine

	try {
		if (sessionId) {
			// Optional: fetch decision from Veriff API to determine actual status
			// For now, redirect with pending status
			// The webhook (POST) will update the provider record with actual decision later
			status = 'pending';
		} else {
			status = 'failed';
		}

		const clientUrl = (process.env.CLIENT_URL || '').replace(/\/+$/, '');
		res.redirect(`${clientUrl}/?veriffStatus=${status}`);
	} catch (err) {
		console.log('Veriff webhook GET error:', err);
		const clientUrl = (process.env.CLIENT_URL || '').replace(/\/+$/, '');
		res.redirect(`${clientUrl}/?veriffStatus=error`);
	}
});
router.post('/veriff/webhook', handleDecision);
router.post('/veriff/startVerification', startVerification);

// Get provider (status)
// router.get('/:id', getProvider);

// (optional) endpoint to refresh status
// router.get('/:id/veriff/status', getVerificationStatus);

module.exports = router;
