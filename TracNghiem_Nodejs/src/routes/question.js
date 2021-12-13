const express = require('express');
const router = express.Router();

const questionController = require('../app/controllers/QuestionController');
const validate = require('../app/validation/questionValidation')

const upload = require('../app/middlewares/multer');

router.post('/excel', upload.single('fileExcel'), questionController.addByExcel)
router.post('/', validate.validateQuestion, questionController.addOne)
router.put('/:id', validate.validateQuestionUpdate, questionController.updateOne)
router.delete('/:id', questionController.deleteOne);
router.get('/:id/choices', questionController.getMultipleChoice);
router.get('/:id/check', questionController.checkFK);
router.get('/:id', questionController.getOne);
router.get('/', questionController.getAll);

module.exports = router;