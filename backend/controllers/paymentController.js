const { getConnectedAccountId } = require('../Utils/stripeUtil');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/******************* Create a Stripe Checkout Session **************************/
exports.createCheckoutSession = async (req, res) => {
	try {
		const { bookingId, totalPrice, serviceProviderId } = req.body;

		/*** Fetch the stripe connected account ID from your DB using serviceProviderId ***/
		const connectedAccountId = await getConnectedAccountId(serviceProviderId);

		/******** Setup Stripe Session Payload *********/
		const sessionPayload = {
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'Buddy Booking Payment'
						},
						unit_amount: parseInt((totalPrice * 100).toFixed(0))
					},
					quantity: 1
				}
			],
			mode: 'payment',
			client_reference_id: bookingId, // Pass booking ID to webhook
			success_url: `${process.env.CLIENT_URL}/booking-summary?status=success&bookingId=${bookingId}`, // Redirect url post success payment
			cancel_url: `${process.env.CLIENT_URL}/bookings?status=cancelled&bookingId=${bookingId}`, // Redirect url post failed payment
			automatic_tax: { enabled: false },
			metadata: {
				bookingId,
				serviceProviderId,
				connectedAccountExists: !!connectedAccountId
			}
		};

		/******* If provider has a Stripe account, route payment directly to them ********/
		if (connectedAccountId) {
			sessionPayload.payment_intent_data = {
				transfer_data: {
					destination: connectedAccountId
				}
			};
		}

		const session = await stripe.checkout.sessions.create(sessionPayload);

		res.status(200).json({ url: session.url });
	} catch (error) {
		console.error('Stripe Checkout Error:', error);
		res.status(500).json({ message: 'Unable to create Stripe Checkout session' });
	}
};
