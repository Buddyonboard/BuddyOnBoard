const admin = require('../Config/firebase');
const notificationService = require('../Services/notificationService');
const welcomeTemplate = require('../Utils/emailTemplates/welcomeTemplate');
const providerCancellationTemplate = require('../Utils/emailTemplates/providerCancellationTemplate');
const bookingConfirmationTemplate = require('../Utils/emailTemplates/bookingConfirmationTemplate');
const cancellationAcknowledgementTemplate = require('../Utils/emailTemplates/cancellationAcknowledgementTemplate');
const BookingRequestTemplate = require('../Utils/emailTemplates/BookingRequestTemplate');
const payoutEmailTemplate = require('../Utils/emailTemplates/payoutEmailTemplate');

/****** Url's Helpers ******/
const logoUrl =
	'https://buddy-on-board-demo.netlify.app/assets/FooterBrandImage-pT9N-t7z.svg';
const loginUrl = 'https://buddy-on-board-demo.netlify.app/sign-in';
const faqUrl = 'https://buddy-on-board-demo.netlify.app/explore-faqs';
const bookingUrl = 'https://buddy-on-board-demo.netlify.app/bookings';
const serviceRequestUrl =
	'https://buddy-on-board-demo.netlify.app/service-request';
const buddyRequestUrl =
	'https://buddy-on-board-demo.netlify.app/buddy-dashboard';

/**
 * NOTE: This minimal implementation sends synchronously (await).
 * If you prefer "fire-and-forget" change service call to .catch(...) and return early.
 */

/****** Welcome Email - Triggered after user email is verified ******/
async function sendWelcome(req, res) {
	try {
		// Read token from Authorization header
		const authHeader = req.headers.authorization || '';
		const idToken = authHeader.replace('Bearer ', '').trim();
		if (!idToken) return res.status(401).json({ error: 'Missing auth token' });

		// Verify token with firebase-admin
		let decoded;
		try {
			decoded = await admin.auth().verifyIdToken(idToken);
		} catch (err) {
			console.log('Invalid ID token', err);
			return res.status(401).json({ error: 'Invalid or expired token' });
		}

		const { email, name } = req.body;
		if (!email) return res.status(400).json({ error: 'email is required' });

		// Verify the client-provided email matches token email
		if (email !== decoded.email) {
			// possible tampering — reject
			return res
				.status(401)
				.json({ error: 'Auth token does not match provided email' });
		}

		/* Main html content of email to be sent*/
		const html = welcomeTemplate({
			firstName: name,
			logoUrl,
			loginUrl,
			faqUrl
		});

		await notificationService.sendEmail({
			to: email,
			subject: 'Welcome to Buddy On Board 🎉',
			html
		});

		res.json({ success: true, message: 'Welcome email sent successfully!' });
	} catch (err) {
		console.error('sendWelcome error:', err);
		res
			.status(500)
			.json({ success: false, error: err.message || 'Internal error' });
	}
}

/****** Booking Confirmation Email - Triggered after Service Seeker payment success ******/
async function sendBookingConfirmation(req, res) {
	try {
		const {
			email,
			firstName,
			buddyName,
			dateTime,
			fromLocation,
			toLocation,
			serviceType
		} = req.body;

		if (!email) return res.status(400).json({ error: 'email required' });

		/* Main html content of email to be sent*/
		const html = bookingConfirmationTemplate({
			firstName,
			buddyName,
			dateTime,
			fromLocation,
			toLocation,
			serviceType,
			bookingUrl,
			faqUrl,
			logoUrl
		});

		await notificationService.sendEmail({
			to: email,
			subject: 'Buddy On Board - Booking Confirmed ✅',
			html
		});

		res.json({
			success: true,
			message: 'Booking Confirmation email sent successfully!'
		});
	} catch (err) {
		console.error('sendBookingConfirmation error:', err);
		res
			.status(500)
			.json({ success: false, error: err.message || 'Internal error' });
	}
}

/****** Cancellation Acknowledgement - Triggered to Service Seeker after cancel booking ******/
async function sendCancellationAcknowledgement(req, res) {
	try {
		const { email, name, bookingId } = req.body;

		if (!email || !bookingId)
			return res.status(400).json({ error: 'email & bookingId required' });

		const html = cancellationAcknowledgementTemplate({
			name,
			bookingId,
			logoUrl,
			serviceRequestUrl
		});

		await notificationService.sendEmail({
			to: email,
			subject: `Cancellation Acknowledged — ${bookingId}`,
			html
		});

		res.json({
			success: true,
			message: 'Booking Cancellation Acknowledgement email sent successfully!'
		});
	} catch (err) {
		console.error('sendCancellationAcknowledgement error:', err);
		res
			.status(500)
			.json({ success: false, error: err.message || 'Internal error' });
	}
}

/***** Cancellation Acknowledgement - Triggered to Service Provider after cancel booking *****/
async function sendProviderCancellation(req, res) {
	try {
		const { providerEmail, providerName, bookingId } = req.body;

		if (!providerEmail || !bookingId)
			return res.status(400).json({ error: 'providerEmail & bookingId required' });

		const html = providerCancellationTemplate({
			providerName,
			bookingId,
			logoUrl,
			serviceRequestUrl
		});

		await notificationService.sendEmail({
			to: providerEmail,
			subject: `Booking Cancelled by Seeker — ${bookingId}`,
			html
		});

		res.json({
			success: true,
			message: 'Booking Cancellation Acknowledgement email sent successfully!'
		});
	} catch (err) {
		console.error('sendProviderCancellation error:', err);
		res
			.status(500)
			.json({ success: false, error: err.message || 'Internal error' });
	}
}

/***** Booking Request - Triggered to Service Provider once Seeker sends a request *****/
async function sendProviderBookingRequest(req, res) {
	try {
		const {
			buddyName,
			providerEmail,
			serviceSeekerName,
			serviceType,
			fromLocation,
			toLocation,
			dateTime
		} = req.body;

		if (!providerEmail)
			return res.status(400).json({ error: 'providerEmail required' });

		const html = BookingRequestTemplate({
			buddyName,
			serviceSeekerName,
			serviceType,
			fromLocation,
			toLocation,
			dateTime,
			buddyRequestUrl,
			logoUrl
		});

		await notificationService.sendEmail({
			to: providerEmail,
			subject: 'New Booking Request',
			html
		});

		res.json({
			success: true,
			message: 'Booking Request email sent successfully!'
		});
	} catch (err) {
		console.error('sendProviderBookingRequest error:', err);
		res
			.status(500)
			.json({ success: false, error: err.message || 'Internal error' });
	}
}

/****** Send Payout Report Email to ADMIN ******/
async function sendPayoutReportEmail(payouts) {
	try {
		if (!payouts.length) return;

		await notificationService.sendEmail({
			// from: 'Payouts <payouts@yourdomain.com>',
			to: 'hrk@buddyonboard.co',
			subject: 'Eligible Buddy Payout Report',
			html: payoutEmailTemplate(payouts)
		});
	} catch (err) {
		console.error('sendPayoutReportEmail error:', err);
		res
			.status(500)
			.json({ success: false, error: err.message || 'Internal error' });
	}
}

module.exports = {
	sendWelcome,
	sendBookingConfirmation,
	sendCancellationAcknowledgement,
	sendProviderCancellation,
	sendProviderBookingRequest,
	sendPayoutReportEmail
};
