const mongoose = require('mongoose');

const AirportSchema = new mongoose.Schema(
	{},
	{ collection: 'airports', strict: false }
);

const Airports = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('Airport', AirportSchema);

module.exports = Airports;
