const express = require('express');
const router = express.Router();
const roleTeacher = require('../app/middlewares/roleTeacher');

const registerController = require('../app/controllers/RegisterController');

router.post('/check-register', registerController.checkRegister);
router.post('/get-questions', registerController.getQuestions);
router.post('/', roleTeacher, registerController.addOne);
router.delete('/:id', roleTeacher, registerController.deleteOne);
router.put('/:id/edit', roleTeacher, registerController.updateOne)
router.get('/:id', registerController.getOne);
router.get('/', roleTeacher, registerController.getAll);

module.exports = router;