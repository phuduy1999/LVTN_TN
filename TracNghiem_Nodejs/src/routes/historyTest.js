const express = require('express');
const router = express.Router();

const historyTestController = require('../app/controllers/HistoryTestController');

router.post('/', historyTestController.getHistoryTest);
router.post('/get-questions-history', historyTestController.getQuestionsHistory);

module.exports = router;