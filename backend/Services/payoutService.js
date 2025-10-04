const stripe = require('../Config/stripeService');
const BuddyRequestModal = require('../models/SendRequestSchema');
const ServiceProvider = require('../models/ServiceProviderSchema');
const mongoose = require('mongoose');
const pino = require('pino');
const logger = pino();

const DEFAULT_CURRENCY = 'usd';
const ELIGIBLE_LISTING_STATUS = 'completed';

/**
 * Find eligible requests only inside buddy_requests.previous_requests
 */
async function findEligibleRequests(now = new Date()) {
	// Find parent docs where previous_requests contain eligible items
	const docs = await BuddyRequestModal.find({
		'buddy_requests.previous_requests': {
			$elemMatch: {
				payoutScheduledAt: { $lte: now },
				listingStatus: ELIGIBLE_LISTING_STATUS,
				paymentStatus: 'succeeded',
				$or: [
					{ refundStatus: { $exists: false } },
					{ refundStatus: { $ne: 'processed' } }
				],
				$or: [{ payoutStatus: { $exists: false } }, { payoutStatus: 'scheduled' }]
			}
		}
	}).lean();

	const eligible = [];

	for (const doc of docs) {
		const prev =
			(doc.buddy_requests && doc.buddy_requests.previous_requests) || [];
		for (const r of prev) {
			const scheduledAt = r.payoutScheduledAt
				? new Date(r.payoutScheduledAt)
				: null;
			if (
				scheduledAt &&
				scheduledAt <= now &&
				r.listingStatus === ELIGIBLE_LISTING_STATUS &&
				r.paymentStatus === 'succeeded' &&
				(!r.refundStatus || r.refundStatus !== 'processed') &&
				(!r.payoutStatus || r.payoutStatus === 'scheduled')
			) {
				eligible.push({
					parentDocId: doc._id,
					arrayType: 'previous_requests',
					request: r
				});
			}
		}
	}

	return eligible;
}

/**
 * Compute transfer amount for a request in cents.
 */
function computeTransferAmountCents(request) {
	const paid = Number(request.paymentDetails?.amountPaid || 0);
	const tax = Number(request.paymentDetails?.taxAmount || 0);
	const platformFee = Number(request.totalAmount?.platformFee || 0);
	const refunded = Number(request.refundAmount || 0);

	const transferAmountMajor = paid + tax - platformFee - refunded;
	const safe = Math.max(0, transferAmountMajor);
	return Math.round(safe * 100);
}

/**
 * Update nested element in previous_requests using arrayFilters.
 */
async function markRequestPayoutResult({
	parentDocId,
	requestId,
	updateFields = {}
}) {
	const arrayBase = `buddy_requests.previous_requests`;
	const elementPath = `${arrayBase}.$[elem]`;
	const arrayFilters = [{ 'elem._id': mongoose.Types.ObjectId(requestId) }];

	const setObj = {};
	for (const [k, v] of Object.entries(updateFields)) {
		setObj[`${elementPath}.${k}`] = v;
	}

	await BuddyRequestModal.updateOne(
		{ _id: parentDocId },
		{ $set: setObj },
		{ arrayFilters }
	);
}

/**
 * Main worker
 */
async function processPayouts({ limit = 100 } = {}) {
	logger.info('Payout worker: start');
	const now = new Date();
	const eligible = await findEligibleRequests(now);

	if (!eligible.length) {
		logger.info('Payout worker: no eligible payouts');
		return { processed: 0 };
	}

	let processed = 0;

	for (const item of eligible.slice(0, limit)) {
		const { parentDocId, request } = item;
		const requestId = request._id;
		try {
			const providerId = request.service_Provider_Id;
			if (!providerId) {
				logger.warn('Request missing service_Provider_Id', { requestId });
				await markRequestPayoutResult({
					parentDocId,
					requestId,
					updateFields: {
						payoutStatus: 'failed',
						payoutAttemptedAt: new Date(),
						payoutError: 'Missing service_Provider_Id'
					}
				});
				continue;
			}

			const provider = await ServiceProvider.findById(providerId).lean();
			if (!provider) {
				logger.warn('Provider not found', { providerId });
				await markRequestPayoutResult({
					parentDocId,
					requestId,
					updateFields: {
						payoutStatus: 'failed',
						payoutAttemptedAt: new Date(),
						payoutError: 'Provider not found'
					}
				});
				continue;
			}

			const connectedAccountId = provider.userDetails?.stripeConnectedAccountId;
			if (!connectedAccountId) {
				logger.warn('Provider missing stripeConnectedAccountId', { providerId });
				await markRequestPayoutResult({
					parentDocId,
					requestId,
					updateFields: {
						payoutStatus: 'failed',
						payoutAttemptedAt: new Date(),
						payoutError: 'Provider missing stripeConnectedAccountId'
					}
				});
				continue;
			}

			// Re-fetch parent doc and request to avoid race
			const freshParent = await BuddyRequestModal.findById(parentDocId).lean();
			if (!freshParent) {
				logger.warn('Parent doc not found', { parentDocId });
				continue;
			}
			const freshReq = (
				(freshParent.buddy_requests &&
					freshParent.buddy_requests.previous_requests) ||
				[]
			).find((x) => String(x._id) === String(requestId));
			if (!freshReq) {
				logger.info('Request not found (maybe moved)', { requestId });
				continue;
			}
			if (freshReq.payoutStatus && freshReq.payoutStatus !== 'scheduled') {
				logger.info('Request payoutStatus not scheduled - skipping', {
					requestId,
					payoutStatus: freshReq.payoutStatus
				});
				continue;
			}

			const amountCents = computeTransferAmountCents(freshReq);
			if (amountCents <= 0) {
				logger.info('Zero payout amount - marking skipped', { requestId });
				await markRequestPayoutResult({
					parentDocId,
					requestId,
					updateFields: {
						payoutStatus: 'skipped',
						payoutAttemptedAt: new Date(),
						payoutAmount: 0
					}
				});
				continue;
			}

			const idempotencyKey = `payout:booking:${String(requestId)}`;

			let transfer;
			try {
				transfer = await stripe.transfers.create(
					{
						amount: amountCents,
						currency: freshReq.paymentDetails?.currency || DEFAULT_CURRENCY,
						destination: connectedAccountId,
						metadata: {
							bookingRequestId: String(requestId),
							parentDocId: String(parentDocId),
							note: 'payout'
						}
					},
					{ idempotencyKey }
				);
			} catch (err) {
				logger.error('Stripe transfer failed', { err: err.message, requestId });
				await markRequestPayoutResult({
					parentDocId,
					requestId,
					updateFields: {
						payoutStatus: 'failed',
						payoutAttemptedAt: new Date(),
						payoutError: err.message
					}
				});
				continue;
			}

			await markRequestPayoutResult({
				parentDocId,
				requestId,
				updateFields: {
					payoutStatus: 'paid',
					payoutAttemptedAt: new Date(),
					payoutTransferId: transfer.id,
					payoutAmount: amountCents / 100,
					payoutCurrency:
						transfer.currency || freshReq.paymentDetails?.currency || DEFAULT_CURRENCY
				}
			});

			processed += 1;
			logger.info('Payout successful', {
				requestId,
				transferId: transfer.id,
				amountCents
			});
		} catch (err) {
			logger.error('Error processing payout for request', {
				requestId: item.request?._id,
				error: err.message
			});
			try {
				await markRequestPayoutResult({
					parentDocId: item.parentDocId,
					requestId: item.request._id,
					updateFields: {
						payoutStatus: 'failed',
						payoutAttemptedAt: new Date(),
						payoutError: err.message
					}
				});
			} catch (uerr) {
				logger.error('Failed to mark request failed', { err: uerr.message });
			}
		}
	}

	logger.info('Payout worker finished', { processed });
	return { processed };
}

module.exports = {
	processPayouts,
	findEligibleRequests,
	computeTransferAmountCents
};
