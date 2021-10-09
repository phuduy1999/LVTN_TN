const express = require('express');
const router = express.Router();

const recoveryController = require('../app/controllers/RecoveryController');

router.get('/', recoveryController.getList)
router.post('/backup', recoveryController.backup)
router.get('/restore/:position', recoveryController.restoreByPosition)


module.exports = router;