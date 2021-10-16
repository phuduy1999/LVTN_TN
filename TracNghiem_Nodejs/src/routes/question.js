const express = require('express');
const router = express.Router();

const questionController = require('../app/controllers/QuestionController');

const upload = require('../app/middlewares/multer');

router.post('/', questionController.addOne)
router.post('/excel', upload.single('fileExcel'), questionController.addByExcel)
router.get('/:id/choices', questionController.getMultipleChoice);
router.put('/:id/edit', questionController.updateOne)
router.delete('/:id', questionController.deleteOne);
router.get('/:id/check', questionController.checkFK);
router.get('/:id', questionController.getOne);
router.get('/', questionController.getAll);

module.exports = router;