// const mongoose = require('mongoose');
// let gridfsBucket;

// const initGridFS = (bucketName) => {
// 	if (!gridfsBucket) {
// 		const conn = mongoose.connection;

// 		gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
// 			bucketName: bucketName || 'file_uploads' // your bucket name
// 		});

// 		console.log('GridFS Initialized');
// 	}
// };

// const getGridFSBucket = (bucketName) => gridfsBucket;

// module.exports = {
// 	initGridFS,
// 	getGridFSBucket
// };

/******************************* Latest GridFs Connection **************************/
const mongoose = require('mongoose');

// Map to store multiple GridFSBucket instances by bucket name
const bucketMap = {};

/************* Initialize and cache GridFSBucket for a given bucket name ************/
const initGridFS = (bucketName = 'file_uploads') => {
	if (!bucketMap[bucketName]) {
		const conn = mongoose.connection;

		if (!conn || !conn.db) {
			throw new Error('Mongoose connection not initialized');
		}

		bucketMap[bucketName] = new mongoose.mongo.GridFSBucket(conn.db, {
			bucketName
		});

		console.log(`GridFS Initialized for bucket: ${bucketName}`);
	}
};

/************* Get the GridFSBucket for a given bucket name **************/
const getGridFSBucket = (bucketName = 'file_uploads') => {
	if (!bucketMap[bucketName]) {
		// Auto-init if not yet created
		initGridFS(bucketName);
	}
	return bucketMap[bucketName];
};

module.exports = {
	initGridFS,
	getGridFSBucket
};
