const express = require('express');
const {
	getAirports,
	getAllCountries
} = require('../controllers/dataFetchController');
const {
	userRegistration,
	findUserData
} = require('../controllers/userController');
const router = express.Router();

router.get('/airportsList', getAirports);
router.get('/users/:userUid', findUserData);
router.get('/countriesList', getAllCountries);

router.post('/user-registration', userRegistration);

module.exports = router;
