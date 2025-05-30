require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const { initGridFS } = require('./Config/gridFs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

const startServer = async () => {
	await connectDB(); // Connect MongoDB
	initGridFS(); // Init GridFS once DB is connected
};

startServer();
// connectDB(); // Connect MongoDB

app.use('/api/v1', require('./Routes/routes'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
