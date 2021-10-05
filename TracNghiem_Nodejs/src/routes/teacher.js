const express = require('express');
const router = express.Router();
const roleTeacher_PGV = require('../app/middlewares/roleTeacher_PGV');

const teacherController = require('../app/controllers/TeacherController');

router.post('/', roleTeacher_PGV, teacherController.addOne)
router.put('/:id/edit', roleTeacher_PGV, teacherController.updateOne)
router.get('/:id/email', teacherController.getOneByEmail);
router.delete('/:id', roleTeacher_PGV, teacherController.deleteOne);
router.get('/:id', roleTeacher_PGV, teacherController.getOne);
router.get('/', roleTeacher_PGV, teacherController.getAll);

module.exports = router;