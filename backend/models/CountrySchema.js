const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema(
	{},
	{ collection: 'countries', strict: false }
);

const Country = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('Country', CountrySchema);

module.exports = Country;
