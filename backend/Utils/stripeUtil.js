const serviceProvider = require('../models/ServiceProviderSchema');

/******** Fetch Stripe Connected Account ID for a given provider ********/
const getConnectedAccountId = async (providerId) => {
	const provider = await serviceProvider
		.findOne({ user_Id: providerId })
		.select('stripeConnectedAccountId');

	if (!provider) {
		throw new Error('Provider not found');
	}

	return provider.stripeConnectedAccountId || null;
};

module.exports = { getConnectedAccountId };
