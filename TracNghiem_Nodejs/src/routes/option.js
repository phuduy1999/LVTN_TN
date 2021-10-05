const express = require('express');
const router = express.Router();

const optionController = require('../app/controllers/OptionController');

router.get('/:id', optionController.getOptionsOfQuestion);

module.exports = router;