const Airports = require('../models/AirportSchema');

/****** Retreive airport data based on query ******/
exports.getAirports = async (req, res) => {
	try {
		const searchQuery = req.query.query;

		if (!searchQuery) return res.json([]);

		const airports = await Airports.find(
			{
				$or: [
					{ municipality: { $regex: searchQuery, $options: 'i' } },
					{ iata_code: { $regex: searchQuery, $options: 'i' } },
					{ name: { $regex: searchQuery, $options: 'i' } },
					{ iso_country: { $regex: searchQuery, $options: 'i' } },
					{ country_name: { $regex: searchQuery, $options: 'i' } }
				]
			},
			{
				_id: 0,
				iata_code: 1,
				municipality: 1,
				country_name: 1,
				iso_country: 1,
				name: 1
			}
		);
		// ).limit(10);

		res.json(airports);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to search airports' });
	}
};
