const router = require('express').Router();

const { admin } = require('./middlewares/employee-auth');

const LoginController = require('./controllers/LoginController');
const EmployeeController = require('./controllers/EmployeeController');

router.post('/login', LoginController.logInEmployee);

router.post('/employee', admin, EmployeeController.createEmployee);

module.exports = router;
