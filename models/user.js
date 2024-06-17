const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true
	},
	login: {
		type: String,
		minlength: 2,
		maxlength: 32,
		required: true,
		unique: true
	},
	password: {
		type: String,
		minlength: 6,
		required: true
	}
});

module.exports = mongoose.model('user', userSchema);
