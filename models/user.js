const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
		required: true,
		select: false
	}
});

userSchema.statics.findUserByCredentals = function findUserByCredentals(
	email,
	password
) {
	return this.findOne({ email })
		.select('+password')
		.then((user) => {
			if (!user) {
				return Promise.reject(new AuthError('Неправильные почта или пароль'));
			}
			return bcrypt.compare(password, user.password).then((matched) => {
				if (!matched) {
					return Promise.reject(new AuthError('Неправильные почта или пароль'));
				}
				return user;
			});
		});
};

module.exports = mongoose.model('user', userSchema);
