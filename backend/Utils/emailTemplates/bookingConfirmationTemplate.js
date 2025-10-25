function bookingConfirmationTemplate({
	firstName,
	buddyName,
	dateTime,
	fromLocation,
	toLocation,
	serviceType,
	bookingUrl,
	faqUrl,
	logoUrl
}) {
	return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Your Booking with ${buddyName} is Confirmed!</title>
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
        .btn {
          background-color: #275EFE;
          color: #ffffff !important;
          padding: 12px 20px;
          border-radius: 5px;
          text-decoration: none;
          display: inline-block;
          margin-top: 16px;
        }
        .footer-logo {
          display: block;
          margin: 20px auto 0 auto;
        }
        .text-bold {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="${logoUrl}" alt="Buddy On Board Logo" width="120" class="logo" />

        <p style="font-size: 18px; font-weight: bold;">
          Hi ${firstName},
        </p>

        <p>
          You’re all set! Your booking with <strong>${buddyName}</strong> has been confirmed for <strong>${dateTime}</strong>. 🎉
        </p>

        <p class="text-bold" style="margin-top: 16px;">Booking Summary:</p>
        <div style="margin-bottom: 16px;">
          <p>• From: ${fromLocation}</p>
          <p>• To: ${toLocation}</p>
          <p>• Service: ${serviceType}</p>
          <p>• Buddy: ${buddyName}</p>
        </div>

        <a href="${bookingUrl}" class="btn">View Booking Details</a>

        <p style="margin-top: 20px;">
          If you have any questions or need help, please visit our
          <a href="${faqUrl}" style="color: #275EFE; text-decoration: underline;">FAQs</a>.
        </p>

        <p style="margin-top: 24px;">
          Safe travels! ✈️<br />
          The Buddy On Board Team
        </p>

        <img src="${logoUrl}" alt="Buddy On Board Logo" width="80" class="footer-logo" />
      </div>
    </body>
  </html>
  `;
}

module.exports = bookingConfirmationTemplate;
