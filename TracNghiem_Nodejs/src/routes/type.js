const express = require('express');
const router = express.Router();

const typeController = require('../app/controllers/TypeController');

router.get('/:id', typeController.getOne);
router.get('/', typeController.getAll);

module.exports = router;