const countries = require('i18n-iso-countries');

/****** Load English country names ******/
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

/**
 * Converts full country name (e.g. "India") to ISO 2-letter code ("IN")
 * @param {string} countryName - Country name from DB
 * @returns {string} ISO country code or null if not found
 */
function getCountryCode(countryName) {
	if (!countryName) return null;
	const code = countries.getAlpha2Code(countryName, 'en');

	return code || null;
}

module.exports = { getCountryCode };
