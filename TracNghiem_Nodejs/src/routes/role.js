const express = require('express');
const router = express.Router();

const roleController = require('../app/controllers/RoleController');

router.get('/', roleController.getAll);

module.exports = router;