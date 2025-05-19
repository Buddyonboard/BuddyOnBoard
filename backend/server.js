require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

connectDB();

app.use('/api/v1', require('./Routes/routes'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
