// const Provider = require('../models/provider');
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

/* DO NOT DELETE :: FUTURE REFERENCE */
// exports.handleDecision = async (req, res) => {
// 	try {
// 		const rawBody = req.rawBody || Buffer.from(JSON.stringify(req.body));
// 		const signature = req.get(HMAC_HEADER) || req.get('X-HMAC-SIGNATURE');
// 		const clientHeader = req.get(CLIENT_HEADER) || req.get('X-AUTH-CLIENT');
// 		// Verify with shared secret
// 		const secret = process.env.VERIFF_WEBHOOK_SECRET;

// 		if (secret) {
// 			const ok = verifyHmac(rawBody, signature, secret);
// 			if (!ok) {
// 				console.warn('Webhook HMAC mismatch');
// 				return res.status(401).send('Invalid signature');
// 			}
// 		} else {
// 			console.warn(
// 				'VERIFF_WEBHOOK_SECRET not configured — skipping HMAC verification'
// 			);
// 		}

// 		const payload = req.body;

// 		// The decision webhook payload contains session id and decision/verification object
// 		// Map sessionId -> provider (we set vendorData to providerId in createSession)
// 		// Accept multiple vendorData locations — adapt based on what your session creation stored
// 		const sessionId =
// 			payload?.verification?.id ||
// 			payload?.session?.id ||
// 			payload?.sessionId ||
// 			null;
// 		const vendorData =
// 			payload?.verification?.vendorData ||
// 			payload?.vendorData ||
// 			payload?.metadata?.vendorData ||
// 			null;

// 		let provider = null;
// 		if (vendorData) {
// 			provider = await serviceProvider.findById(vendorData);
// 		}

// 		// If vendorData not present, fallback: lookup by veriff.sessionId
// 		if (!provider && sessionId) {
// 			provider = await serviceProvider.findOne({ 'veriff.sessionId': sessionId });
// 		}

// 		if (!provider) {
// 			// We still must respond 200 to avoid retries but log
// 			console.warn(
// 				'Webhook: provider not found for sessionId/vendorData',
// 				sessionId,
// 				vendorData
// 			);
// 			console.log('Payload saved for manual investigation');
// 			// Optionally store this payload in a collection for manual mapping
// 			return res.status(200).send('ok'); // respond ok to Veriff
// 		}

// 		// Update provider.veriff based on received decision/status
// 		const verification = payload?.verification || payload?.session || payload;
// 		const status = verification?.status || verification?.decision || null;
// 		const decision = verification?.decision || verification?.result || null; // adapt to the payload shape
// 		const reason =
// 			verification?.reason || verification?.reasons?.join?.(', ') || null;
// 		const reasonCode = verification?.reasonCode || null;
// 		const acceptanceTime =
// 			verification?.acceptanceTime || verification?.submittedAt || null;

// 		// Update fields (map statuses to ours)
// 		provider.veriff.sessionId = provider.veriff.sessionId || sessionId;
// 		provider.veriff.status = status || provider.veriff.status;
// 		provider.veriff.decision = decision || provider.veriff.decision;
// 		provider.veriff.reason = reason || provider.veriff.reason;
// 		provider.veriff.reasonCode = reasonCode || provider.veriff.reasonCode;
// 		provider.veriff.rawWebhookPayload = payload;
// 		provider.veriff.lastUpdated = new Date();

// 		if (decision === 'approved' || status === 'approved') {
// 			provider.veriff.verifiedAt = acceptanceTime
// 				? new Date(acceptanceTime)
// 				: new Date();
// 			provider.isVerified = true;
// 		} else {
// 			provider.isVerified = false;
// 		}

// 		await provider.save();

// 		// (Optional) Emit events — email notify, in-app notification, etc.
// 		// e.g., eventEmitter.emit('provider.verified', provider);

// 		return res.status(200).send('ok');
// 	} catch (err) {
// 		console.error('webhook handleDecision err', err);		// In veriffWebhook.js (POST handler)
// 		exports.handleDecision = async (req, res) => {
// 		  const { verification } = req.body;

// 		  try {
// 			const provider = await serviceProvider.findOne({
// 			  'veriff.sessionId': verification.id
// 			});

// 			if (provider) {
// 			  provider.veriff.status = verification.status; // approved, declined, etc.
// 			  provider.veriff.decision = verification.status;
// 			  provider.veriff.lastUpdated = new Date();
// 			  await provider.save();
// 			}

// 			res.json({ received: true });
// 		  } catch (err) {
// 			console.error('Decision webhook error:', err);
// 			res.status(500).json({ error: 'Webhook processing failed' });
// 		  }
// 		};
// 		// Internal error — 500 will cause Veriff to retry (which is okay if you want retries)
// 		return res.status(500).send('error');
// 	}
// };

/* In veriffWebhook.js (POST handler) */
exports.handleDecision = async (req, res) => {
	const { verification } = req.body;

	try {
		const provider = await serviceProvider.findOne({
			'veriff.sessionId': verification.id
		});

		if (provider) {
			provider.veriff.status = verification.status;
			provider.veriff.decision = verification.status;
			provider.veriff.lastUpdated = new Date();
			await provider.save();
		}

		res.json({ received: true });
	} catch (err) {
		console.log('Veriff decision webhook error:', err);
		res.status(500).json({ error: 'Webhook processing failed' });
	}
};
