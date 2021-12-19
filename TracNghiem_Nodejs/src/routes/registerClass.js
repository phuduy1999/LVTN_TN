const express = require('express');
const router = express.Router();

const registerClassController = require('../app/controllers/RegisterClassController');
const validate = require('../app/validation/registerClassValidation')

router.post('/', validate.validateRegisterClassValidation, registerClassController.addRegisterClass);
router.get('/:id', registerClassController.getClasses);

module.exports = router;