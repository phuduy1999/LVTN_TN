const express = require('express');
const router = express.Router();

const facultyController = require('../app/controllers/FacultyController');
const validate = require('../app/validation/facultyValidation')

router.post('/', validate.validateFaculty, facultyController.addOne)
router.put('/:id', validate.validateFaculty, facultyController.updateOne)
router.delete('/:id', facultyController.deleteOne);
router.get('/:id/check', facultyController.checkFK);
router.get('/:id', facultyController.getOne);
router.get('/', facultyController.getAll);

module.exports = router;