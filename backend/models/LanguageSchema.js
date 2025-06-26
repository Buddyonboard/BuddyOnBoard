const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema(
	{},
	{ collection: 'languages', strict: false }
);

const Languages = mongoose.connection
	.useDb('BuddyOnBoard_Database')
	.model('Language', LanguageSchema);

module.exports = Languages;
