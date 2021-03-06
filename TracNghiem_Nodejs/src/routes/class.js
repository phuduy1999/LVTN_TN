const express = require('express');
const router = express.Router();
const roleTeacher_PGV = require('../app/middlewares/roleTeacher_PGV');

const classController = require('../app/controllers/ClassController');
const validate = require('../app/validation/classValidation')

router.post('/', roleTeacher_PGV, validate.validateClass, classController.addOne)
router.put('/:id/cancel', roleTeacher_PGV, classController.cancelOne)
router.put('/:id/restore', roleTeacher_PGV, classController.restoreOne)
router.put('/:id', roleTeacher_PGV, validate.validateClass, classController.updateOne)
router.delete('/:id', roleTeacher_PGV, classController.deleteOne);
router.get('/cancel', classController.getAllCancel);
router.get('/school-year', classController.getSchoolYear);
router.get('/:id/check', roleTeacher_PGV, classController.checkFK);
router.get('/:id/check-before-edit', roleTeacher_PGV, classController.checkBeforeEdit);
router.get('/:id/check-before-cancel', roleTeacher_PGV, classController.checkBeforeCancel);
router.get('/:id', classController.getOne);
router.get('/', classController.getAll);

module.exports = router;