const express = require('express');
const router = express.Router();

const facultyController = require('../app/controllers/FacultyController');

router.post('/', facultyController.addOne)
router.put('/:id/edit', facultyController.updateOne)
router.delete('/:id', facultyController.deleteOne);
router.get('/:id', facultyController.getOne);
router.get('/', facultyController.getAll);

module.exports = router;