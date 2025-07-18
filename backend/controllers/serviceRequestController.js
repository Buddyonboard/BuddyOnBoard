const ServiceRequests = require('../models/ServiceRequestSchema');
const { getGFS } = require('../Config/gridFs');
const ReportIssue = require('../models/ReportIssueSchema');

/*************** Handle serviceRequest file + form submission ********************/
const serviceRequestUpload = async (req, res) => {
	try {
		const {
			fullName,
			email,
			categoryRequest,
			yourMessage,
			requestCallBack,
			privacyTerms,
			phoneNumber
		} = req.body;

		/**** Save form + filename to ServiceRequests collection ****/
		const finalPayload = new ServiceRequests({
			fullName,
			email,
			categoryRequest,
			yourMessage,
			requestCallBack,
			privacyTerms,
			phoneNumber,
			uploadAttachment: req.file?.filename || null,
			createdAt: new Date(),
			updatedAt: new Date()
		});

		await finalPayload.save();

		res.status(200).json({
			success: true,
			message: 'Form submitted and file uploaded successfully',
			data: finalPayload
		});
	} catch (error) {
		console.error('Error uploading file/form:', error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

/***************** Handle reportIssue file + form submission ******************/
const reportIssueUpload = async (req, res) => {
	try {
		const {
			fullName,
			email,
			typeOfIssue,
			yourMessage,
			requestCallBack,
			privacyTerms,
			phoneNumber,
			anonymousTerms
		} = req.body;

		/**** Save form + filename to ServiceRequests collection ****/
		const finalPayload = new ReportIssue({
			fullName,
			email,
			typeOfIssue,
			yourMessage,
			requestCallBack,
			privacyTerms,
			phoneNumber,
			anonymousTerms,
			uploadAttachment: req.file?.filename || null,
			createdAt: new Date(),
			updatedAt: new Date()
		});

		await finalPayload.save();

		res.status(200).json({
			success: true,
			message: 'Form submitted and file uploaded successfully',
			data: finalPayload
		});
	} catch (error) {
		console.error('Error uploading file/form:', error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

/*************** Get all Service requests list (with filename reference) ****************/
const getServiceRequests = async (req, res) => {
	try {
		const requests = await ServiceRequests.find().sort({ createdAt: -1 });
		res.status(200).json({
			success: true,
			message: 'Successfully fetched service requests',
			data: requests
		});
	} catch (error) {
		console.error('Error fetching service requests:', error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

/*************** Get all Issue reports list (with filename reference) ****************/
const getIssueReports = async (req, res) => {
	try {
		const reports = await ReportIssue.find().sort({ createdAt: -1 });
		res.status(200).json({
			success: true,
			message: 'Successfully fetched reports',
			data: reports
		});
	} catch (error) {
		console.error('Error fetching reports:', error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

/******************* Download file by filename ***********************/
const downloadFile = async (req, res) => {
	const gfs = getGFS();
	if (!gfs) return res.status(500).json({ error: 'GridFS not initialized' });

	try {
		const file = await gfs.files.findOne({ filename: req.params.filename });
		if (!file) return res.status(404).json({ error: 'File not found' });

		const readStream = gfs.createReadStream(file.filename);
		res.set('Content-Type', file.contentType);
		res.set('Content-Disposition', `attachment; filename="${file.filename}"`);
		readStream.pipe(res);
	} catch (err) {
		console.error('Error downloading file:', err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = {
	serviceRequestUpload,
	getServiceRequests,
	downloadFile,
	reportIssueUpload,
	getIssueReports
};
