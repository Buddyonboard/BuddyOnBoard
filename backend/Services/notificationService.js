const { Resend } = require('resend');

if (!process.env.RESEND_API_KEY) {
	console.warn('Warning: RESEND_API_KEY is not set in env');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM;

/**
 * sendEmail - minimal wrapper around Resend SDK
 * @param {string} to - recipient email
 * @param {string} subject
 * @param {string} html
 * @returns provider response
 */
async function sendEmail({ to, subject, html }) {
	if (!to) throw new Error('Missing "to" address');
	if (!subject) throw new Error('Missing "subject"');

	// This call sends synchronously. Errors will bubble up to controllers.
	const res = await resend.emails.send({
		from: FROM,
		to,
		subject,
		html
	});

	return res; // contains provider message id and metadata
}

module.exports = { sendEmail };
