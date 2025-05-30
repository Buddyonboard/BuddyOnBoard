const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

const initGridFS = () => {
	if (!gfs) {
		const conn = mongoose.connection;

		gfs = Grid(conn.db, mongoose.mongo);
		gfs.collection('file_uploads');
		console.log('GridFS Initialized');
	}
};

const getGFS = () => gfs;

module.exports = {
	initGridFS,
	getGFS
};
