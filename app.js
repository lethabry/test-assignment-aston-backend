const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/clientdb');

app.listen(PORT, () => {
	console.log('server active');
});