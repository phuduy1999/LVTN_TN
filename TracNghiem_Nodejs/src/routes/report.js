const express = require('express');
const router = express.Router();

const reportController = require('../app/controllers/ReportController');

router.get('/list-signature/:id', reportController.getListSignature);
router.get('/transcript/:id', reportController.getTranscript);

module.exports = router;