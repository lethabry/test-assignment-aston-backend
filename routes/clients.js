const router = require('express').Router();

const { changeClientStatusValidation } = require('../middlewares/validation');

const {
	getSelectedClients,
	changeClientStatus
} = require('../controllers/clients');

router.get('/', getSelectedClients);

router.patch('/:_id', changeClientStatusValidation, changeClientStatus);

module.exports = router;
