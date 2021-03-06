const siteRouter = require('./site');
const facultyRouter = require('./faculty');
const teacherRouter = require('./teacher');
const studentRouter = require('./student');
const subjectRouter = require('./subject');
const classRouter = require('./class');
const typeRouter = require('./type');
const questionRouter = require('./question');
const registerRouter = require('./register');
const optionRouter = require('./option');
const registerClassRouter = require('./registerClass');
const recordMarkRouter = require('./recordMark');
const historyTestRouter = require('./historyTest');
const recoveryRouter = require('./recovery');
const roleRouter = require('./role');
const reportRouter = require('./report');
const testingRouter = require('./testing');
const authenticateToken = require('../app/middlewares/auth');
const roleTeacher = require('../app/middlewares/roleTeacher');
const roleTeacher_PGV = require('../app/middlewares/roleTeacher_PGV');
const roleStudent = require('../app/middlewares/roleStudent');
const roleAdmin = require('../app/middlewares/roleAdmin');

function route(app) {
    app.use('/api/faculties', authenticateToken, roleTeacher_PGV, facultyRouter);
    app.use('/api/teachers', authenticateToken, roleTeacher, teacherRouter);
    app.use('/api/students', authenticateToken, studentRouter);
    app.use('/api/subjects', authenticateToken, subjectRouter);
    app.use('/api/classes', authenticateToken, roleTeacher, classRouter);
    app.use('/api/questions', authenticateToken, roleTeacher, questionRouter);
    app.use('/api/types', authenticateToken, roleTeacher, typeRouter);
    app.use('/api/registers', authenticateToken, registerRouter);
    app.use('/api/options', authenticateToken, roleStudent, optionRouter);
    app.use('/api/register-classes', authenticateToken, roleStudent, registerClassRouter);
    app.use('/api/record-mark', authenticateToken, roleStudent, recordMarkRouter);
    app.use('/api/history-test', authenticateToken, roleStudent, historyTestRouter);
    app.use('/api/roles', authenticateToken, roleTeacher_PGV, roleRouter);
    app.use('/api/recovery', authenticateToken, roleAdmin, recoveryRouter);
    app.use('/api/reports', authenticateToken, roleTeacher, reportRouter);
    app.use('/api/testing', authenticateToken, roleStudent, testingRouter);
    app.use('/', siteRouter);
}

module.exports = route;
