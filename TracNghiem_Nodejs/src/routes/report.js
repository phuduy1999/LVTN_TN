const express = require('express');
const router = express.Router();

const reportController = require('../app/controllers/ReportController');

router.get('/list-signature/:id', reportController.getListSignature);
router.get('/transcript/:id', reportController.getTranscript);
router.get('/list-class-opened/:status', reportController.getListClassReport);
router.post('/questions-history', reportController.getQuestionsHistory);

module.exports = router;