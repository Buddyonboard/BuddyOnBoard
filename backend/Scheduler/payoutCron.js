const cron = require('node-cron');
const payoutService = require('../Services/payoutService');
const logger = require('pino')();

function startPayoutCron() {
	// run hourly at minute 10
	cron.schedule(
		'10 * * * *',
		async () => {
			logger.info('Payout cron triggered');
			try {
				const result = await payoutService.processPayouts();
				logger.info('Payout cron result', result);
			} catch (err) {
				logger.error('Payout cron error', err);
			}
		},
		{ timezone: 'UTC' }
	);
}

module.exports = { startPayoutCron };
