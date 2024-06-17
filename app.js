require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const router = require('./routes/index');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const checkAccessCors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mongodbURL = require('./utils/config');
const Client = require('./models/client');
const User = require('./models/user');
const {
	randomizeFullName,
	generateUsers,
	generateClients
} = require('./utils/createTestData');

const app = express();
const { PORT = 3001 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkAccessCors);

mongoose
	.connect(
		process.env.NODE_ENV !== 'production'
			? mongodbURL
			: process.env.MONOGOD_SERVER
	)
	.then(async () => {
		const fullnames = randomizeFullName(3);
		const users = generateUsers(3, fullnames);
		const createdUsers = await User.insertMany(users);
		const idx = createdUsers.map((user) => user._id);
		const clients = generateClients(10, idx);
		await Client.insertMany(clients);
	})
	.catch((err) => {
		console.error('Error connecting to MongoDB:', err);
		process.exit(1);
	});

app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT);
