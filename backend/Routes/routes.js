const express = require('express');
const { getAirports } = require('../controllers/dataFetchController');
const {
	userRegistration,
	findUserData
} = require('../controllers/userController');
const router = express.Router();

router.get('/airportsList', getAirports);
router.get('/users/:userUid', findUserData);

router.post('/user-registration', userRegistration);

module.exports = router;
