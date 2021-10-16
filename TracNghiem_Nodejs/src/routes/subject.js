const express = require('express');
const router = express.Router();
const roleTeacher = require('../app/middlewares/roleTeacher');
const roleTeacher_PGV = require('../app/middlewares/roleTeacher_PGV');

const subjectController = require('../app/controllers/SubjectController');

router.post('/', roleTeacher_PGV, subjectController.addOne)
router.put('/:id/edit', roleTeacher_PGV, subjectController.updateOne)
router.delete('/:id', roleTeacher_PGV, subjectController.deleteOne);
router.get('/:id/check', roleTeacher_PGV, subjectController.checkFK);
router.get('/:id', roleTeacher_PGV, subjectController.getOne);
router.get('/:name/name', roleTeacher, subjectController.getOneByName);
router.get('/', subjectController.getAll);

module.exports = router;