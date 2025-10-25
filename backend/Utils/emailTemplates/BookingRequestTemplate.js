function bookingRequestTemplate({
	buddyName,
	serviceSeekerName,
	serviceType,
	fromLocation,
	toLocation,
	dateTime,
	buddyRequestUrl,
	logoUrl,
	appName = 'Buddy On Board'
} = {}) {
	return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Booking Request</title>
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
        .link-button {
          background-color: #275EFE;
          color: #ffffff !important;
          padding: 12px 20px;
          border-radius: 5px;
          text-decoration: none;
          display: inline-block;
          margin-top: 16px;
        }
        .details-title {
          font-weight: bold;
          margin-top: 16px;
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
          Hi ${buddyName || 'there'},
        </p>

        <p style="margin: 0 0 12px 0;">
          🎉 Great news — you’ve received a new booking request from <strong>${serviceSeekerName}</strong> for <strong>${serviceType}</strong>!
        </p>

        <p class="details-title">Trip Details:</p>
        <p style="margin: 0 0 8px 0;">• From: ${fromLocation}</p>
        <p style="margin: 0 0 8px 0;">• To: ${toLocation}</p>
        <p style="margin: 0 0 8px 0;">• When: ${dateTime}</p>
        

        <p style="margin: 16px 0 16px 0;">
          Buddies who respond quickly to requests tend to have higher chances of successful bookings — so don’t wait too long! ⏳
        </p>

        ${
									buddyRequestUrl
										? `<a href="${buddyRequestUrl}" class="link-button">View Request</a>`
										: ''
								}

        <p style="margin-top: 24px;">
          Thanks for being an important part of ${appName}!
          <br />
          – The ${appName} Team
        </p>

        ${
									logoUrl
										? `<img src="${logoUrl}" alt="${appName} Logo" width="80" class="footer-logo" />`
										: ''
								}

        <p class="muted" style="margin-top: 12px;">
          This is an automated email — please do not reply.
        </p>
      </div>
    </body>
  </html>
  `;
}

module.exports = bookingRequestTemplate;
