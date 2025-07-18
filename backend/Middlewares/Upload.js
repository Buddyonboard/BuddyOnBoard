const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

/***************** Buddy Request Uploads ******************/
const storage = new GridFsStorage({
	url: process.env.MONGO_URI,
	file: (req, file) => {
		return {
			filename: `${Date.now()}-${file.originalname}`,
			bucketName: 'buddy_request_file_uploads'
		};
	}
});

const buddy_request_upload = multer({ storage });

/**************** Service Request Uploads ****************/
const serviceReqStorage = new GridFsStorage({
	url: process.env.MONGO_URI,
	file: (req, file) => {
		return {
			filename: `${Date.now()}-${file.originalname}`,
			bucketName: 'file_uploads'
		};
	}
});
const service_request_upload = multer({ serviceReqStorage });

module.exports = { buddy_request_upload, service_request_upload };
