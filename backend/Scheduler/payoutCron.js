const cron = require('node-cron');
const payoutService = require('../Services/payoutService');
const logger = require('pino')();

/******** Do Not Delete *******/
// function startPayoutCron() {
// 	// run hourly at minute 10
// 	cron.schedule(
// 		'10 * * * *',
// 		async () => {
// 			logger.info('Payout cron triggered');
// 			try {
// 				const result = await payoutService.processPayouts();
// 				logger.info('Payout cron result', result);
// 			} catch (err) {
// 				logger.error('Payout cron error', err);
// 			}
// 		},
// 		{ timezone: 'UTC' }
// 	);
// }

/******* Temp solution to send out payout ********/
function startPayoutCron() {
	cron.schedule(
		// '10 * * * *', //Run every hour at minute 10 (UTC)
		'0 0 * * *', // Run at 12 AM (UTC)
		async () => {
			logger.info('Payout report cron triggered');

			try {
				const result = await payoutService.collectEligiblePayouts();

				logger.info('Payout report cron result', result);
			} catch (err) {
				logger.error('Payout report cron error', err);
			}
		},
		{
			timezone: 'UTC'
		}
	);
}

module.exports = { startPayoutCron, startPayoutCron };
