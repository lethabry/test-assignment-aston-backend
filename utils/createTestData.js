const { faker } = require('@faker-js/faker');

const randomizeFullName = (count) => {
	const fullNames = [];
	for (let i = 0; i < count; i++) {
		fullNames.push(
			`${faker.person.firstName()} ${faker.person.middleName()} ${faker.person.lastName()}`
		);
	}
	return fullNames;
};

const getRandomElement = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
};

// Создание тестовых данных для клиентов
const generateClients = (count, array) => {
	const clients = [];
	for (let i = 0; i < count; i++) {
		clients.push({
			accountNumber: faker.database.mongodbObjectId(),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			middleName: faker.person.middleName(),
			birthDate: faker.date.past(),
			inn: faker.finance.accountNumber(12),
			responcibleWorker: getRandomElement(array)
		});
	}
	return clients;
};

// Создание тестовых данных для пользователей
const generateUsers = (count, array) => {
	const users = [];

	for (let i = 0; i < count; i++) {
		users.push({
			fullname: getRandomElement(array),
			email: faker.internet.email(),
			password: faker.internet.password()
		});
	}
	return users;
};

module.exports = { randomizeFullName, generateClients, generateUsers };
