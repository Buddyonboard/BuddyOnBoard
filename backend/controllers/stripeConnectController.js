const serviceProvider = require('../models/ServiceProviderSchema');
const { getCountryCode } = require('../Utils/countryIsoHelper');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/********** Handle "Open Stripe" button ***********/
exports.openStripe = async (req, res) => {
	try {
		const { providerId } = req.body;
		const user = await serviceProvider.findOne({ user_Id: providerId });

		if (!user || user.userDetails.role !== 'serviceProvider') {
			return res.status(403).json({ error: 'Not authorized' });
		}

		/******* CASE 1: No Stripe account yet → create new ********/
		if (!user.userDetails.stripeConnectedAccountId) {
			const account = await stripe.accounts.create({
				type: 'express',
				// country: getCountryCode(user.userDetails.countryOfResidence) || 'CA',
				country: 'CA',
				email: user.userDetails.email,
				business_type: 'individual',
				capabilities: {
					card_payments: { requested: true },
					transfers: { requested: true }
				}
			});

			// Save account ID in DB
			user.userDetails.stripeConnectedAccountId = account.id;
			user.userDetails.stripeConnectedAccountStatus = 'created';
			user.markModified('userDetails');
			await user.save();

			// Generate onboarding link
			const accountLink = await stripe.accountLinks.create({
				account: account.id,
				refresh_url: `${process.env.CLIENT_URL}/buddy-dashboard`,
				return_url: `${process.env.CLIENT_URL}/buddy-dashboard`,
				type: 'account_onboarding'
			});

			return res.json({ url: accountLink.url });
		}

		/******* CASE 2: Existing account → login link for Express Dashboard *******/
		const loginLink = await stripe.accounts.createLoginLink(
			user.userDetails.stripeConnectedAccountId
		);

		return res.json({ url: loginLink.url });
	} catch (err) {
		console.error('Stripe Connect Error:', err);
		return res.status(500).json({ error: 'Failed to open Stripe Connect' });
	}
};
