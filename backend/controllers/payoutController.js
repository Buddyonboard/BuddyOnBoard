const payoutService = require('../Services/payoutService');
const BuddyRequestModal = require('../models/SendRequestSchema');

/* To trigger payouts */
exports.triggerPayouts = async (req, res) => {
	const cronSecret = process.env.CRON_SECRET;
	const incomingSecret = req.header('x-cron-secret');

	// console.log('CRON_SECRET', process.env.CRON_SECRET);
	// console.log('incomingSecret', incomingSecret);

	if (!cronSecret || incomingSecret !== cronSecret) {
		return res.status(401).json({ success: false, message: 'Unauthorized' });
	}

	if (req.method === 'OPTIONS') return res.sendStatus(204);

	try {
		const result = await payoutService.processPayouts({ limit: 100 });
		return res.json({ success: true, result });
	} catch (error) {
		console.log('Cron payout error', error);
		return res.status(500).json({ success: false, message: error.message });
	}
};

/* DO NOT DELETE :: FOR FUTURE REFERENCE */
/**
 * Manual trigger (admin)
 */
// exports.triggerPayouts = async (req, res) => {
// 	try {
// 		const result = await payoutService.processPayouts({ limit: 1000 });
// 		return res.json({ success: true, result });
// 	} catch (err) {
// 		console.error('Manual payout trigger failed:', err);
// 		return res.status(500).json({ success: false, message: err.message });
// 	}
// };

/**
 * Provider payout history - only reads previous_requests entries
 */
// exports.getProviderPayoutHistory = async (req, res) => {
// 	try {
// 		const { providerId } = req.params;
// 		if (!providerId)
// 			return res.status(400).json({ message: 'providerId required' });

// 		const docs = await BuddyRequestModal.find({
// 			'buddy_requests.previous_requests.service_Provider_Id': providerId
// 		}).lean();

// 		const results = [];
// 		for (const doc of docs) {
// 			const prev =
// 				(doc.buddy_requests && doc.buddy_requests.previous_requests) || [];
// 			for (const r of prev) {
// 				if (String(r.service_Provider_Id) === String(providerId)) {
// 					results.push({
// 						parentDocId: doc._id,
// 						requestId: r._id,
// 						serviceType: r.serviceType,
// 						listingStatus: r.listingStatus,
// 						paymentStatus: r.paymentStatus,
// 						payoutStatus: r.payoutStatus,
// 						payoutAmount: r.payoutAmount,
// 						payoutCurrency: r.payoutCurrency,
// 						payoutTransferId: r.payoutTransferId,
// 						payoutAttemptedAt: r.payoutAttemptedAt,
// 						payoutScheduledAt: r.payoutScheduledAt,
// 						totalAmount: r.totalAmount || {},
// 						paymentDetails: r.paymentDetails || {}
// 					});
// 				}
// 			}
// 		}

// 		results.sort((a, b) => {
// 			const da = a.payoutAttemptedAt || a.payoutScheduledAt || 0;
// 			const db = b.payoutAttemptedAt || b.payoutScheduledAt || 0;
// 			return new Date(db) - new Date(da);
// 		});

// 		return res.json({ success: true, payouts: results });
// 	} catch (err) {
// 		console.error('getProviderPayoutHistory error', err);
// 		return res.status(500).json({ success: false, message: err.message });
// 	}
// };
