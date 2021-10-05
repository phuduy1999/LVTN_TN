const express = require('express');
const router = express.Router();

const registerClassController = require('../app/controllers/RegisterClassController');

router.post('/', registerClassController.addRegisterClass);
router.get('/:id', registerClassController.getClasses);

module.exports = router;