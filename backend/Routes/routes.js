const express = require('express');
const {
	getAirports,
	getAllCountries
} = require('../controllers/dataFetchController');
const {
	userRegistration,
	findUserData
} = require('../controllers/userController');
const {
	serviceRequestUpload,
	upload,
	getServiceRequests,
	reportIssueUpload,
	getIssueReports
} = require('../controllers/serviceRequestController');
const router = express.Router();

router.get('/airportsList', getAirports);
router.get('/users/:userUid', findUserData);
router.get('/countriesList', getAllCountries);
router.get('/serviceRequestsList', getServiceRequests);
router.get('/issueReportsList', getIssueReports);

router.post('/user-registration', userRegistration);
router.post(
	'/service-requests',
	upload.single('uploadAttachment'),
	serviceRequestUpload
);
router.post(
	'/report-issue',
	upload.single('uploadAttachment'),
	reportIssueUpload
);

module.exports = router;
