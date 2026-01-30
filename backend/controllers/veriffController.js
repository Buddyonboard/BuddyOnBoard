const serviceProvider = require('../models/ServiceProviderSchema');
const veriffService = require('../Services/veriffService');

/**
 * Creates a veriff session, saves session info to provider doc, returns session.url to client
 */
exports.startVerification = async (req, res) => {
	const { providerId } = req.body;

	try {
		const provider = await serviceProvider.findOne({ user_Id: providerId });
		if (!provider) return res.status(404).json({ error: 'Provider not found' });

		// If already approved, short-circuit
		if (provider.isVerified && provider.veriff?.status === 'approved') {
			return res.status(200).json({ message: 'Provider is already verified' });
		}

		// Establish Payload for Veriff Create Session
		const payload = {
			callbackUrl: `${process.env.BASE_URL}/veriff/webhook`,
			person: {
				firstName: provider.userDetails?.firstName,
				lastName: provider.userDetails?.lastName,
				email: provider.userDetails?.email,
				phoneNumber: provider.userDetails?.phoneNumber
			}
		};

		// Create Veriff Session
		const veriffResp = await veriffService.createSession(payload, providerId);

		// veriffResp expected: { id, url, sessionToken, status }
		provider.veriff.sessionId = veriffResp.id;
		provider.veriff.sessionUrl = veriffResp.url;
		provider.veriff.sessionToken = veriffResp.sessionToken || null;
		provider.veriff.status = veriffResp.status || null;
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
