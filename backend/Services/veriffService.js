const axios = require('axios');

const VERIFF_API = process.env.VERIFF_API; // current public endpoint
const VERIFF_API_KEY = process.env.VERIFF_API_KEY; // keep secret on server

/**
 * createSession(payload, providerId)
 * payload: object with person/vendorData etc. (constructed in controller)
 * returns: { id, url, sessionToken, status }
 */
exports.createSession = async (payload = {}, providerId) => {
	// Build body according to Veriff docs. Only include non-empty fields to avoid 1104 error
	const person = {};
	const srcPerson = payload.person || {};
	// prefer camelCase for Veriff API: firstName, lastName, email, phoneNumber
	if (srcPerson.firstName) person.firstName = srcPerson.firstName;
	if (srcPerson.lastName) person.lastName = srcPerson.lastName;
	if (srcPerson.email) person.email = srcPerson.email;
	if (srcPerson.phoneNumber) person.phoneNumber = srcPerson.phoneNumber;
	// accept snake_case from controller as fallback
	if (!person.firstName && srcPerson.first_name)
		person.firstName = srcPerson.first_name;
	if (!person.lastName && srcPerson.last_name)
		person.lastName = srcPerson.last_name;
	if (!person.phoneNumber && srcPerson.phone_number)
		person.phoneNumber = srcPerson.phone_number;

	const body = {
		verification: {
			callback: payload.callback_url || payload.callbackUrl,
			person: person,
			vendorData: providerId || payload.vendorData || payload.vendor_data
		}
	};

	console.log('Veriff request body:', JSON.stringify(body));

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

		// attempt to extract any decision/full-auto URL fields Veriff may include
		// const decisionUrl =
		// 	verification.decisionUrl ||
		// 	verification.fullAutoUrl ||
		// 	verification.decision_url ||
		// 	verification.decision?.fullAutoUrl ||
		// 	verification.decision?.url ||
		// 	null;

		return {
			id: verification.id || null,
			url: verification.url || null,
			sessionToken: verification.sessionToken || null,
			status: verification.data?.verification?.decision || null,
			// decisionUrl: decisionUrl
		};
	} catch (err) {
		console.log('veriff createSession error', err?.response?.data || err.message);
		throw err;
	}
};

// Fetch full-auto decision via Veriff API
exports.fetchFullAutoDecision = async (sessionId) => {
	if (!sessionId) throw new Error('sessionId required');

	const url = `https://api.veriff.com/v1/sessions/${sessionId}/decision/fullauto`;

	const resp = await axios.get(url, {
		headers: {
			'X-AUTH-CLIENT': VERIFF_API_KEY
		}
	});

	return resp.data;
};
