const serviceProvider = require('../models/ServiceProviderSchema');
const veriffService = require('../Services/veriffService');

/**
 * Poll Veriff for full-auto decision and persist it to provider record
 */
exports.fetchDecisionForSession = async (req, res) => {
	const { sessionId } = req.body || req.query || {};

	if (!sessionId) return res.status(400).json({ error: 'sessionId required' });

	try {
		const decisionResp = await veriffService.fetchFullAutoDecision(sessionId);
		const verification = decisionResp?.verification || decisionResp || {};
		const fullAutoDecision = decisionResp?.data?.verification?.decision;
		const status = fullAutoDecision;
		const normalized = fullAutoDecision;

		// find provider by sessionId
		const provider = await serviceProvider.findOne({
			'veriff.sessionId': sessionId
		});
		if (!provider)
			return res.status(404).json({ error: 'Provider not found for sessionId' });

		provider.veriff.status =
			normalized !== null ? normalized : provider.veriff.status;
		// removeLegacyDecisionField(provider);
		provider.veriff.rawWebhookPayload =
			decisionResp || provider.veriff.rawWebhookPayload;
		provider.veriff.lastUpdated = new Date();

		if (normalized === 'approved') {
			provider.veriff.verifiedAt = new Date();
			provider.isVerified = true;
		} else if (['declined', 'expired', 'abandoned'].includes(normalized)) {
			provider.isVerified = false;
		}

		await provider.save();
		return res.json({ updated: true, status: normalized });
	} catch (err) {
		console.error(
			'fetchDecisionForSession err',
			err?.response?.data || err.message
		);
		return res
			.status(500)
			.json({ error: 'Failed to fetch decision', detail: err.message });
	}
};

/**
 * Creates a veriff session, saves session info to provider doc, returns session.url to client
 */
exports.startVerification = async (req, res) => {
	const { providerId } = req.body;

	try {
		const provider = await serviceProvider.findOne({ user_Id: providerId });
		if (!provider) return res.status(404).json({ error: 'Provider not found' });

		// If already approved, short-circuit
		if (
			provider.isVerified &&
			provider.veriff?.rawWebhookPayload?.data?.verification?.decision ===
				'success'
		) {
			return res.status(200).json({ message: 'Provider is already verified' });
		}

		// Establish Payload for Veriff Create Session
		const callbackBase = process.env.VERIFF_CALLBACK_URL || process.env.BASE_URL;
		const callbackUrl = callbackBase
			? `${callbackBase.toString().replace(/\/+$/, '')}/veriff/webhook`
			: null;

		if (!callbackUrl) {
			console.log(
				'Missing Veriff callback URL. Set VERIFF_CALLBACK_URL or BASE_URL in env.'
			);
			return res
				.status(500)
				.json({ error: 'Veriff callback configuration missing' });
		}

		const payload = {
			callbackUrl,
			person: {
				firstName: provider.userDetails?.firstName,
				lastName: provider.userDetails?.lastName,
				email: provider.userDetails?.email,
				phoneNumber: provider.userDetails?.phoneNumber
			}
		};

		// Create Veriff Session; vendorData should be the provider document _id for webhook mapping
		const veriffResp = await veriffService.createSession(payload, provider._id);

		// veriffResp expected: { id, url, sessionToken, status }
		provider.veriff.sessionId = veriffResp.id;
		provider.veriff.sessionUrl = veriffResp.url;
		// provider.veriff.decisionUrl =
		// 	veriffResp.decisionUrl || provider.veriff.decisionUrl || null;
		provider.veriff.sessionToken = veriffResp.sessionToken || null;
		// provider.veriff.status = veriffResp.status || provider.veriff.status || null;
		provider.veriff.status = veriffResp.status || provider.veriff.status || null;
		provider.veriff.lastUpdated = new Date();
		await provider.save();

		// Return to frontend
		return res.json({
			sessionUrl: veriffResp.url,
			sessionId: veriffResp.id,
			sessionToken: veriffResp.sessionToken || null
		});
	} catch (err) {
		console.log('startVerification err', err);
		return res.status(500).json({ error: 'Internal error' });
	}
};

/*** DO NOT DELETE :: For future reference ***/
// exports.getProvider = async (req, res) => {
// 	try {
// 		const provider = await serviceProvider.findById(req.params.id);
// 		if (!provider) return res.status(404).json({ error: 'Provider not found' });
// 		return res.json(provider);
// 	} catch (err) {
// 		console.error(err);
// 		return res.status(500).json({ error: 'Internal error' });
// 	}
// };

// exports.getVerificationStatus = async (req, res) => {
// 	try {
// 		const provider = await serviceProvider.findById(req.params.id);
// 		if (!provider) return res.status(404).json({ error: 'Provider not found' });
// 		return res.json({
// 			status: provider.veriff.status,
// 			decision: provider.veriff.decision,
// 			verifiedAt: provider.veriff.verifiedAt
// 		});
// 	} catch (err) {
// 		console.error(err);
// 		return res.status(500).json({ error: 'Internal error' });
// 	}
// };
