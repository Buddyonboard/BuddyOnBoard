function providerCancellationTemplate({
	providerName,
	bookingId,
	logoUrl,
	serviceRequestUrl,
	appName = 'Buddy On Board'
} = {}) {
	return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Booking Cancelled — ${bookingId}</title>
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
        .link {
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

        <p style="font-size:18px; font-weight:bold; margin:0 0 12px 0;">
          Hi ${providerName || 'there'},
        </p>

        <p style="margin: 0 0 12px 0;">
          We wanted to let you know that a service seeker has cancelled their booking.
          <br/>
          <strong>Booking Reference: ${bookingId || '-'}</strong>
        </p>

        <p style="margin: 0 0 12px 0;">
          We understand this might be disappointing, especially when you were ready to help and earn along the way.
        </p>

        <p style="margin: 0 0 12px 0;">
          Please know that this change is part of the travel experience, and there are always new opportunities around the corner.
        </p>

        <p style="margin: 0 0 12px 0;">
          You’ll be notified when new requests matching your route or availability come in.
        </p>

        <p style="margin: 0 0 12px 0;">
          In the meantime, if you have any questions or need support, feel free to
          ${
											serviceRequestUrl
												? `<a href="${serviceRequestUrl}" class="link"> reach out to us</a>`
												: ' reach out to us'
										}.
        </p>

        <p style="margin-top: 24px;">
          Thank you for being a part of ${appName} 💙
          <br/>
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

module.exports = providerCancellationTemplate;
