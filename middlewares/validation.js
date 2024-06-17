const { celebrate, Joi } = require('celebrate');

const loginValidation = celebrate({
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
});

const changeClientStatusValidation = celebrate({
	params: Joi.object().keys({
		_id: Joi.string().length(24).hex().required()
	}),
	body: Joi.object().keys({
		status: Joi.string().valid('В работе', 'Отказ', 'Сделка закрыта').required()
	})
});

module.exports = {
	loginValidation,
	changeClientStatusValidation
};
