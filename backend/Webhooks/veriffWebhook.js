const serviceProvider = require('../models/ServiceProviderSchema');
const crypto = require('crypto');

// header names (lowercase)
const HMAC_HEADER = 'x-hmac-signature';
const CLIENT_HEADER = 'x-auth-client'; // optional to check origin

// Utility to verify HMAC
function verifyHmac(rawBodyBuffer, signatureFromHeader, secret) {
	if (!signatureFromHeader || !secret) return false;
	const computed = crypto
		.createHmac('sha256', secret)
		.update(rawBodyBuffer)
		.digest('hex');
	// signature might include algorithm prefix; adapt as needed
	return crypto.timingSafeEqual(
		Buffer.from(computed),
		Buffer.from(signatureFromHeader)
	);
}

/* In veriffWebhook.js (POST handler) */
exports.handleDecision = async (req, res) => {
	const rawBody =
		req.body instanceof Buffer ? req.body : Buffer.from(JSON.stringify(req.body));
	const payload =
		typeof req.body === 'string'
			? JSON.parse(req.body)
			: req.body instanceof Buffer
				? JSON.parse(req.body.toString())
				: req.body;

	console.log(
		'Veriff webhook received payload:',
		JSON.stringify(payload, null, 2)
	);

	try {
		const sessionId =
			payload?.verification?.id ||
			payload?.session?.id ||
			payload?.sessionId ||
			payload?.id ||
			null;
		const vendorData =
			payload?.verification?.vendorData ||
			payload?.vendorData ||
			payload?.metadata?.vendorData ||
			null;

		console.log('Extracted sessionId:', sessionId, 'vendorData:', vendorData);

		let provider = null;
		if (vendorData) {
			console.log('Trying to find provider by vendorData (_id):', vendorData);
			provider = await serviceProvider.findById(vendorData);
			if (provider) {
				console.log('Found provider by vendorData');
			} else {
				console.log('Provider not found by vendorData, trying user_Id');
				provider = await serviceProvider.findOne({ user_Id: vendorData });
				if (provider) {
					console.log('Found provider by user_Id');
				}
			}
		}

		if (!provider && sessionId) {
			console.log('Trying to find provider by sessionId:', sessionId);
			provider = await serviceProvider.findOne({ 'veriff.sessionId': sessionId });
			if (provider) {
				console.log('Found provider by sessionId');
			}
		}

		if (!provider) {
			console.warn('Veriff webhook: provider not found for sessionId/vendorData', {
				sessionId,
				vendorData
			});
			return res.status(200).send('ok');
		}

		let status = null;
		try {
			const verification = payload?.verification || payload?.session || payload;
			const fullAutoDecision = payload?.data?.verification?.decision;
			status = fullAutoDecision;
		} catch (statusErr) {
			console.error('❌ ERROR during status extraction:');
			console.error('Message:', statusErr.message);
			console.error('Stack:', statusErr.stack);
			throw statusErr;
		}
		const acceptanceTime =
			verification?.acceptanceTime || verification?.submittedAt || null;
		provider.veriff.sessionId = provider.veriff.sessionId || sessionId;
		provider.veriff.status = status !== null ? status : provider.veriff.status;

		provider.veriff.rawWebhookPayload = payload;
		provider.veriff.lastUpdated = new Date();

		if (status === 'approved') {
			provider.veriff.verifiedAt = acceptanceTime
				? new Date(acceptanceTime)
				: new Date();
			provider.isVerified = true;
		} else if (
			status === 'declined' ||
			status === 'expired' ||
			status === 'abandoned'
		) {
			provider.isVerified = false;
		}

		await provider.save();
		return res.status(200).send('ok');
	} catch (err) {
		console.error('❌ Veriff decision webhook error:');
		console.error('Error message:', err.message);
		console.error('Error stack:', err.stack);
		console.error('Full error:', err);
		return res.status(500).json({ error: 'Webhook processing failed' });
	}
};
