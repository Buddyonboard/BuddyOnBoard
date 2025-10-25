function welcomeTemplate({ firstName, logoUrl, loginUrl, faqUrl }) {
	return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to Buddy On Board</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px; margin: 0;">
      <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; max-width: 600px; margin: auto;">
        
        <div style="text-align: center;">
          <img src="${logoUrl}" alt="Buddy On Board Logo" width="120" style="margin: 0 auto 20px auto; display: block;" />
        </div>

        <p style="font-size: 18px; font-weight: bold;">Hi ${
									firstName || 'Buddy'
								}, 👋</p>

        <p>Welcome to <strong>Buddy On Board</strong> — we’re so happy to have you with us! 😊</p>

        <p style="margin-bottom: 16px;">
          Whether you’re here to find a travel companion or courier buddy, or to offer your help and earn a little extra while you travel, you’ve joined a community built on trust and shared journeys.
        </p>

        <p style="font-weight: bold; margin-bottom: 4px;">Here’s how you can get started:</p>

        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li>Find trusted travel or courier buddies</li>
          <li>Post or respond to service requests</li>
          <li>Chat securely to coordinate details</li>
          <li>Book with confidence, knowing we’ve got your back</li>
        </ul>

        <div style="text-align: center; margin-top: 24px;">
          <a href="${loginUrl}" 
            style="
              background-color: #275EFE;
              color: #ffffff;
              padding: 12px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
              font-weight: bold;
            ">
            👇 Log in and start your journey today
          </a>
        </div>

        <p style="margin-top: 20px; text-align: center;">
          Got questions? Our 
          <a href="${faqUrl}" target="_blank" style="color: #275EFE; text-decoration: underline;">FAQs</a>
          are here to help!
        </p>

        <p style="margin-top: 24px; text-align: center;">
          Wishing you great journeys ahead, ✈️<br />
          <strong>The Buddy On Board Team</strong>
        </p>

        <div style="text-align: center;">
          <img src="${logoUrl}" alt="Buddy On Board Logo" width="80" style="margin: 20px auto 0 auto; display: block;" />
        </div>
      </div>
    </body>
  </html>
  `;
}

module.exports = welcomeTemplate;
