function cancellationAcknowledgementTemplate({
	name,
	bookingId,
	logoUrl,
	serviceRequestUrl,
	refundDays = 5, // 5 business days
	appName = 'Buddy On Board'
} = {}) {
	return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Cancellation Acknowledgement — ${bookingId}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f7f7f7;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          padding: 24px;
          border-radius: 8px;
          max-width: 600px;
          margin: 0 auto;
        }
        .logo {
          display: block;
          margin: 0 auto 20px auto;
        }
        .footer-logo {
          display: block;
          margin: 20px auto 0 auto;
        }
        .btn-link {
          color: #275EFE;
          text-decoration: underline;
        }
        .muted {
          color: #666666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${
									logoUrl
										? `<img src="${logoUrl}" alt="${appName} Logo" width="120" class="logo" />`
										: ''
								}

        <p style="font-size:18px; font-weight:bold; margin:0 0 12px 0;">Hi ${
									name || 'there'
								},</p>

        <p style="margin: 0 0 12px 0;">
          We’ve received your cancellation request for <strong>Booking Reference: ${
											bookingId || '-'
										}</strong>. Our team will review it shortly.
        </p>

        <p style="margin: 0 0 12px 0;">
          Once reviewed, we’ll begin processing your refund. Refunds are typically completed within <strong>${refundDays} business days</strong>.
        </p>

        <p style="margin: 0 0 12px 0;">
          Please note that, in line with our policy, the original platform fee charged at the time of booking will not be refunded.
        </p>

        <p style="margin: 0 0 12px 0;">
          If you have any questions or need help, feel free to
          ${
											serviceRequestUrl
												? `<a href="${serviceRequestUrl}" class="btn-link">reach out to us</a>`
												: 'reach out to us'
										} — we’re here to support you.
        </p>

        <p style="margin-top: 24px;">
          Thank you,<br/>
          – The ${appName} Team
        </p>

        ${
									logoUrl
										? `<img src="${logoUrl}" alt="${appName} Logo" width="80" class="footer-logo" />`
										: ''
								}
        
        <p class="muted" style="margin-top: 12px;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    </body>
  </html>
  `;
}

module.exports = cancellationAcknowledgementTemplate;
