const express = require('express');
const router = express.Router();

const recordMarkController = require('../app/controllers/RecordMarkController');

router.post('/', recordMarkController.addOne);

module.exports = router;