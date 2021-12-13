const express = require('express');
const router = express.Router();
const roleTeacher = require('../app/middlewares/roleTeacher');

const registerController = require('../app/controllers/RegisterController');
const validate = require('../app/validation/registerValidation')

router.post('/check-register', validate.validateRegisterCheck, registerController.checkRegister);
router.post('/check-trial-register', validate.validateRegisterCheckTrial, roleTeacher, registerController.checkTrialRegister);
router.post('/get-questions-for-testing', validate.validateRegisterCheckForTesting, registerController.getQuestionsForTesting);
router.post('/get-questions', validate.validateRegisterGetQuestion, registerController.getQuestions);
router.post('/', roleTeacher, validate.validateRegister, registerController.addOne);
router.put('/:id', roleTeacher, validate.validateRegisterUpdate, registerController.updateOne);
router.delete('/:id', roleTeacher, registerController.deleteOne);
router.get('/:id/check', roleTeacher, registerController.checkFK);
router.get('/:id/check-before-edit', roleTeacher, registerController.checkBeforeEdit);
router.get('/:id/iddk', registerController.getOneByIDDK);
router.get('/:id', registerController.getOne);
router.get('/', roleTeacher, registerController.getAll);

module.exports = router;