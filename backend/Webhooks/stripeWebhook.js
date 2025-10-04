const Stripe = require('stripe');
const BuddyRequestModal = require('../models/SendRequestSchema');
const serviceProvider = require('../models/ServiceProviderSchema');

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

	/************ Stripe Payment Checkout (Service Seeker Payment Session) ***********/
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
			const taxAmount = (session.total_details?.amount_tax || 0) / 100;

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
				status,
				taxAmount
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
			let requestData = null;

			if (
				buddyDoc.buddy_requests.travel_buddy_requests.some(
					(r) => r._id.toString() === bookingId
				)
			) {
				arrayPath = 'buddy_requests.travel_buddy_requests.$[elem].listingStatus';
				arrayBasePath = 'buddy_requests.travel_buddy_requests';
				requestFilter = { 'elem._id': bookingId };
				requestData = buddyDoc.buddy_requests.travel_buddy_requests.find(
					(r) => r._id.toString() === bookingId
				);
			} else if (
				buddyDoc.buddy_requests.courier_buddy_requests.some(
					(r) => r._id.toString() === bookingId
				)
			) {
				arrayPath = 'buddy_requests.courier_buddy_requests.$[elem].listingStatus';
				arrayBasePath = 'buddy_requests.courier_buddy_requests';
				requestFilter = { 'elem._id': bookingId };
				requestData = buddyDoc.buddy_requests.courier_buddy_requests.find(
					(r) => r._id.toString() === bookingId
				);
			}

			if (!arrayPath) {
				console.error('Service type not found for bookingId:', bookingId);
				return res.sendStatus(200);
			}

			if (!requestData) {
				console.error('Booking request not found for:', bookingId);
				return res.sendStatus(200);
			}

			// Determine payment status
			let paymentStatus = 'pending';
			if (session.payment_status === 'paid') paymentStatus = 'succeeded';
			else if (session.payment_status === 'unpaid') paymentStatus = 'failed';

			// Compute payout scheduled date = departureDate + 15 days
			const departureDate = new Date(requestData.trip_details?.departureDate);
			const payoutScheduledAt = new Date(
				departureDate.getTime() + 15 * 24 * 60 * 60 * 1000
			);

			// Build the update object with proper path
			const fieldPath = `${arrayBasePath}.$[elem]`;

			// Prepare update object
			const updateObj = {
				[`${fieldPath}.paymentStatus`]: paymentStatus,
				[`${fieldPath}.paymentDetails`]: paymentDetails,
				[`${fieldPath}.payoutScheduledAt`]: payoutScheduledAt
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

			console.log(`Booking ${bookingId} updated with status: ${paymentStatus}`);
		} catch (err) {
			console.error('Error processing checkout.session.completed:', err);
		}
	}

	/************* Stripe Connect (Service Provider onboarding updates) *************/
	if (event.type === 'account.updated') {
		const account = event.data.object;

		try {
			await serviceProvider.updateOne(
				{ stripeConnectedAccountId: account.id },
				{
					$set: {
						'userDetails.stripeConnectedAccountStatus': account.requirements
							?.disabled_reason
							? 'restricted'
							: account.charges_enabled && account.payouts_enabled
							? 'verified'
							: 'pending',
						'userDetails.requirements': account.requirements
					}
				}
			);
			console.log(`Stripe account ${account.id} updated in DB`);
		} catch (err) {
			console.error('Error updating user on account.updated: ', err);
		}
	}

	if (event.type === 'account.external_account.created') {
		const account = event.data.object;
		console.log(`External account created for ${account.id}`);
		// optional: update DB if you want to track bank accounts
	}

	if (event.type === 'account.external_account.deleted') {
		const account = event.data.object;
		console.log(`External account deleted for ${account.id}`);
		// optional: handle removal in DB
	}

	/*********** Stripe Payment Refund (Service Seeker Booking Cancellation) *************/
	// if (event.type === 'charge.refunded') {
	// 	try {
	// 		const charge = event.data.object;
	// 		// const booking = await BuddyRequestModal.findOne({
	// 		// 	'paymentDetails.chargeId': charge.id
	// 		// });

	// 		// if (booking) {
	// 		// 	booking.listingStatus = 'canceled';
	// 		// 	booking.refundStatus = 'processed';
	// 		// 	// booking.canceledAt = new Date();
	// 		// 	await booking.save();
	// 		// 	console.log(`Booking ${booking._id} marked as canceled via webhook`);
	// 		// }
	// 	} catch (err) {
	// 		console.error('Webhook error (charge.refunded):', err);
	// 	}
	// }

	res.json({ received: true });
};

module.exports = { stripeWebhook };
