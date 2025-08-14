const Stripe = require('stripe');
const BuddyRequestModal = require('../models/SendRequestSchema');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res) => {
	const sig = req.headers['stripe-signature'];
	let event;

	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET
		);
	} catch (err) {
		console.error('Webhook signature verification failed:', err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	if (event.type === 'checkout.session.completed') {
		try {
			const session = await stripe.checkout.sessions.retrieve(
				event.data.object.id,
				{ expand: ['payment_intent.latest_charge'] }
			);

			const paymentIntent = session.payment_intent;

			const charge = paymentIntent?.latest_charge;

			if (!charge) {
				console.error('No charge data found for paymentIntent:', paymentIntent.id);
				return res.sendStatus(200);
			}

			const transactionId = paymentIntent.id;
			const chargeId = charge.id;
			const paymentTime = new Date(charge.created * 1000);
			const amountPaid = session.amount_total / 100; // in currency units
			const currency = charge.currency;
			const status = paymentIntent.status;

			// console.log('Payment successful:', {
			// 	transactionId,
			// 	chargeId,
			// 	paymentTime,
			// 	amountPaid,
			// 	currency,
			// 	status
			// });

			const paymentDetails = {
				transactionId,
				chargeId,
				paymentTime,
				amountPaid,
				currency,
				status
			};

			// Extract booking ID from metadata
			const bookingId = session.client_reference_id;
			if (!bookingId) {
				console.error('No bookingId found in session metadata');
				return res.sendStatus(200);
			}

			// Find which service type and request array contains this booking
			const buddyDoc = await BuddyRequestModal.findOne({
				$or: [
					{ 'buddy_requests.travel_buddy_requests._id': bookingId },
					{ 'buddy_requests.courier_buddy_requests._id': bookingId }
				]
			});

			if (!buddyDoc) {
				console.error('Booking not found in any buddy_requests array');
				return res.sendStatus(200);
			}

			let arrayPath = '';
			let arrayBasePath = '';
			let requestFilter = {};
			if (
				buddyDoc.buddy_requests.travel_buddy_requests.some(
					(r) => r._id.toString() === bookingId
				)
			) {
				arrayPath = 'buddy_requests.travel_buddy_requests.$[elem].listingStatus';
				arrayBasePath = 'buddy_requests.travel_buddy_requests';
				requestFilter = { 'elem._id': bookingId };
			} else if (
				buddyDoc.buddy_requests.courier_buddy_requests.some(
					(r) => r._id.toString() === bookingId
				)
			) {
				arrayPath = 'buddy_requests.courier_buddy_requests.$[elem].listingStatus';
				arrayBasePath = 'buddy_requests.courier_buddy_requests';
				requestFilter = { 'elem._id': bookingId };
			}

			if (!arrayPath) {
				console.error('Service type not found for bookingId:', bookingId);
				return res.sendStatus(200);
			}

			// Determine payment status
			let paymentStatus = 'pending';
			if (session.payment_status === 'paid') paymentStatus = 'succeeded';
			else if (session.payment_status === 'unpaid') paymentStatus = 'failed';

			// Build the update object with proper path
			const fieldPath = `${arrayBasePath}.$[elem]`;

			// Prepare update object
			const updateObj = {
				[`${fieldPath}.paymentStatus`]: paymentStatus,
				[`${fieldPath}.paymentDetails`]: paymentDetails
			};

			if (paymentStatus === 'succeeded') {
				updateObj[arrayPath] = 'active';
			}

			// Update in DB
			await BuddyRequestModal.updateOne(
				{ _id: buddyDoc._id },
				{ $set: updateObj },
				{ arrayFilters: [requestFilter] }
			);

			// console.log(`Booking ${bookingId} updated with status: ${paymentStatus}`);
		} catch (err) {
			console.error('Error processing checkout.session.completed:', err);
		}
	}

	res.json({ received: true });
};

module.exports = { stripeWebhook };
