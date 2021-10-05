const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/result-lenhdat', siteController.resultLenhDat);
router.get('/:slug', siteController.show);
router.post('/', siteController.execsp);
router.get('/', siteController.index);

module.exports = router;
