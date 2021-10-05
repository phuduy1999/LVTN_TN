const express = require('express');
const router = express.Router();
const roleTeacher_PGV = require('../app/middlewares/roleTeacher_PGV');
const roleTeacher = require('../app/middlewares/roleTeacher');

const studentController = require('../app/controllers/StudentController');

router.post('/', roleTeacher_PGV, studentController.addOne)
router.get('/:id/email', studentController.getOneByEmail);
router.get('/:id/class', roleTeacher, studentController.getStudentsInClass);
router.put('/:id/edit', roleTeacher_PGV, studentController.updateOne);
router.delete('/:id', roleTeacher_PGV, studentController.deleteOne);
router.get('/:id', roleTeacher_PGV, studentController.getOne);
router.get('/', roleTeacher_PGV, studentController.getAll);

module.exports = router;