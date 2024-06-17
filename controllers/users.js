const jwt = require('jsonwebtoken');

const User = require('../models/user');
const AuthError = require('../utils/errors/AuthError');

const login = (req, res, next) => {
	const { email, password } = req.body;
	User.findOne({ email, password })
		.then((user) => {
			if (!user) {
				return Promise.reject(new AuthError('Неправильные почта или пароль'));
			} else {
				const token = jwt.sign(
					{ _id: user._id },
					process.env.NODE_ENV !== 'production'
						? 'secret_key'
						: process.env.JWT_SECRET,
					{ expiresIn: '7d' }
				);
				res.cookie('jwt', token, {
					maxAge: 3600000 * 24 * 7,
					httpOnly: true,
					sameSite: true
				});
				res.send({ user });
			}
		})
		.catch(next);
};

const signout = (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) {
		throw new AuthError('Необходима авторизация');
	}
	res.clearCookie('jwt');
	res.status(200).send({ message: 'Успешно' });
	next();
};

module.exports = { login, signout };
