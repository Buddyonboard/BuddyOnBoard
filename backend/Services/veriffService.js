const axios = require('axios');

const VERIFF_API = process.env.VERIFF_API; // current public endpoint
const VERIFF_API_KEY = process.env.VERIFF_API_KEY; // keep secret on server

/**
 * createSession(payload, providerId)
 * payload: object with person/vendorData etc. (constructed in controller)
 * returns: { id, url, sessionToken, status }
 */
exports.createSession = async (payload = {}, providerId) => {
	// Build body according to Veriff docs. Minimum body: { verification: {} } but include metadata/vendorData
	const body = {
		verification: {
			callback_url: payload.callback_url || '',
			person: {
				first_name: payload.person?.first_name || '',
				last_name: payload.person?.last_name || '',
				email: payload.person?.email || '',
				phone_number: payload.person?.phone_number || ''
			},
			// document: {
			// 	type: payload.document?.type || 'PASSPORT',
			// 	country: payload.document?.country || 'US'
			// },
			vendor_data: providerId || payload.vendor_data || ''
		}
	};

	try {
		const resp = await axios.post(VERIFF_API, body, {
			headers: {
				'Content-Type': 'application/json',
				'X-AUTH-CLIENT': VERIFF_API_KEY
			}
			// timeout: 60000
		});

		// API returns verification object => { id, url, sessionToken, status }
		const verification = resp.data?.verification || {};

		return {
			id: verification.id || null,
			url: verification.url || null,
			sessionToken: verification.sessionToken || null,
			status: verification.status || null
		};
	} catch (err) {
		console.error(
			'veriff createSession error',
			err?.response?.data || err.message
		);
		throw err;
	}
};

/**
 * (Optional) Fetch decision via API if you want to poll server-side:
 * GET /v1/sessions/{id}/decision
 */
// exports.fetchDecision = async (sessionId) => {
// 	if (!sessionId) throw new Error('sessionId required');
// 	const url = `https://api.veriff.com/v1/sessions/${sessionId}/decision`;
// 	const resp = await axios.get(url, {
// 		headers: {
// 			'X-AUTH-CLIENT': VERIFF_API_KEY
// 		}
// 	});
// 	return resp.data;
// };
