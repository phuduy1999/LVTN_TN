const express = require('express');
const router = express.Router();
const roleStudent = require('../app/middlewares/roleStudent');

const testingController = require('../app/controllers/TestingController');

router.put('/timer', testingController.updateTimer)
router.put('/', testingController.updateChoice)

module.exports = router;