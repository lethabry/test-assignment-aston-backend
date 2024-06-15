const mongoose = require('mongoose');
const checkIsNumbers = require('../utils/validator');

const clientSchema = new mongoose.Schema({
	accontNumber: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true
	},
	firstName: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true
	},
	middleName: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true
	},
	birthDate: {
		type: Date,
		required: true
	},
	inn: {
		type: String,
		minlength: 12,
		maxlength: 12,
		required: true,
		validate: {
			validator: (v) => checkIsNumbers(v),
			message: 'Неправильный формат ИНН'
		}
	},
	responcibleWorker: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ['В работе', 'Отказ', 'Сделка закрыта'],
		default: 'Не в работе'
	}
});

module.exports = mongoose.model('client', clientSchema);
