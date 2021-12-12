const express = require('express');
const router = express.Router();
const roleTeacher_PGV = require('../app/middlewares/roleTeacher_PGV');
const roleTeacher = require('../app/middlewares/roleTeacher');

const studentController = require('../app/controllers/StudentController');
const validate = require('../app/validation/studentValidation')

router.post('/', roleTeacher_PGV, validate.validateStudent, studentController.addOne)
router.put('/:id', roleTeacher_PGV, validate.validateStudentUpdate, studentController.updateOne);
router.delete('/:id', roleTeacher_PGV, studentController.deleteOne);
router.get('/:email/email', studentController.getOneByEmail);
router.get('/:id/class', roleTeacher, studentController.getStudentsInClass);
router.get('/:id/check', roleTeacher_PGV, studentController.checkFK);
router.get('/:id', roleTeacher_PGV, studentController.getOne);
router.get('/', roleTeacher_PGV, studentController.getAll);

module.exports = router;