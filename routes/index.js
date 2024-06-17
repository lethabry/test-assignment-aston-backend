const router = require('express').Router();

const { login, signout } = require('../controllers/users');
const { loginValidation } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', loginValidation, login);
router.use(auth);
router.post('/signout', signout);

router.use('/clients', require('./clients'));

router.use((req, res, next) => {
	next(new NotFoundError('Страницы не существует'));
});

module.exports = router;
