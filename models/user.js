const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (v) => validator.isEmail(v),
			message: 'Неправильный формат почты'
		}
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('user', userSchema);
