const Client = require('../models/client');
const NotFoundError = require('../utils/errors/NotFoundError');

const getSelectedClients = (req, res, next) => {
	Client.find({})
		.then((clients) => {
			if (clients) {
				const filteredClients = clients.filter(
					(client) => client.responcibleWorker.toString() === req.user._id
				);
				res.send([...filteredClients]);
			}
		})
		.catch(next);
};

const changeClientStatus = (req, res, next) => {
	const { status } = req.body;
	Client.findById(req.params._id)
		.then((client) => {
			if (!client) {
				throw new NotFoundError('Запрашиваемый клиент не найден');
			}
			if (client.responcibleWorker.toString() === req.user._id) {
				Client.findByIdAndUpdate(req.params._id, { status }, { new: true })
					.then((updatedClient) => res.send(updatedClient))
					.catch(next);
			} else {
				throw new NotFoundError('Запрашиваемый клиент не найден');
			}
		})
		.catch(next);
};

module.exports = { getSelectedClients, changeClientStatus };
