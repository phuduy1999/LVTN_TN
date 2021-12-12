const express = require('express');
const router = express.Router();
const roleTeacher_PGV = require('../app/middlewares/roleTeacher_PGV');

const teacherController = require('../app/controllers/TeacherController');
const validate = require('../app/validation/teacherValidation')

router.post('/', roleTeacher_PGV, validate.validateTeacher, teacherController.addOne)
router.put('/:id', roleTeacher_PGV, validate.validateTeacherUpdate, teacherController.updateOne)
router.delete('/:id', roleTeacher_PGV, teacherController.deleteOne);
router.get('/:email/email', teacherController.getOneByEmail);
router.get('/:id/check', roleTeacher_PGV, teacherController.checkFK);
router.get('/:id', roleTeacher_PGV, teacherController.getOne);
router.get('/', roleTeacher_PGV, teacherController.getAll);

module.exports = router;