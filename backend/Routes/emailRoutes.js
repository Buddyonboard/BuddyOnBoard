const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

/**
 * All expect JSON bodies (see controller file for required fields)
 */

router.post('/welcome', emailController.sendWelcome);
router.post('/booking-confirmation', emailController.sendBookingConfirmation);
router.post(
	'/seeker-cancellation',
	emailController.sendCancellationAcknowledgement
);
router.post('/provider-cancellation', emailController.sendProviderCancellation);
router.post(
	'/provider-booking-request',
	emailController.sendProviderBookingRequest
);

module.exports = router;
