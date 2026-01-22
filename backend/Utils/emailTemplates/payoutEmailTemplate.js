function payoutEmailTemplate({ payouts = [], generatedAt = new Date() }) {
	const rows = payouts
		.map(
			(p, index) => `
			<tr>
				<td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
					${index + 1}
				</td>
				<td style="padding: 8px; border: 1px solid #ddd;">
					${p.buddyName}
				</td>
				<td style="padding: 8px; border: 1px solid #ddd;">
					${p.buddyEmail}
				</td>
				<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">
					${p.amount} ${p.currency}
				</td>
				<td style="padding: 8px; border: 1px solid #ddd;">
					${p.requestId}
				</td>
			</tr>
		`
		)
		.join('');

	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Eligible Buddy Payout Report</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0;">
	<table width="100%" cellpadding="0" cellspacing="0">
		<tr>
			<td align="center" style="padding: 24px;">
				<table width="800" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 6px; overflow: hidden;">
					
					<!-- Header -->
					<tr>
						<td style="background-color: #0f172a; padding: 20px;">
							<h1 style="color: #ffffff; margin: 0; font-size: 22px;">
								Eligible Buddy Payout Report
							</h1>
						</td>
					</tr>

					<!-- Body -->
					<tr>
						<td style="padding: 24px;">
							<p style="font-size: 14px; color: #333;">
								Dear Finance Team,
							</p>

							<p style="font-size: 14px; color: #333;">
								Please find below the list of buddies who are eligible for payouts based on completed bookings and successful payments.
							</p>

							<p style="font-size: 14px; color: #333;">
								<strong>Total Eligible Buddies:</strong> ${payouts.length}<br />
								<strong>Report Generated On:</strong> ${generatedAt.toLocaleString()}
							</p>

							<!-- Table -->
							<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 16px; font-size: 13px;">
								<thead>
									<tr style="background-color: #f1f5f9;">
										<th style="padding: 10px; border: 1px solid #ddd;">#</th>
										<th style="padding: 10px; border: 1px solid #ddd;">Buddy Name</th>
										<th style="padding: 10px; border: 1px solid #ddd;">Email Address</th>
										<th style="padding: 10px; border: 1px solid #ddd;">Payout Amount</th>
										<th style="padding: 10px; border: 1px solid #ddd;">Request ID</th>
									</tr>
								</thead>
								<tbody>
									${rows}
								</tbody>
							</table>

							<p style="font-size: 13px; color: #555; margin-top: 20px;">
								This report is generated automatically. Please verify the details before initiating payouts.
							</p>

							<p style="font-size: 14px; color: #333;">
								Regards,<br />
								<strong>Payout Automation System</strong>
							</p>
						</td>
					</tr>

					<!-- Footer -->
					<tr>
						<td style="background-color: #f8fafc; padding: 16px; text-align: center;">
							<p style="font-size: 12px; color: #777; margin: 0;">
								© ${new Date().getFullYear()} Your Company Name. All rights reserved.
							</p>
						</td>
					</tr>

				</table>
			</td>
		</tr>
	</table>
</body>
</html>
`;
}

module.exports = payoutEmailTemplate;
