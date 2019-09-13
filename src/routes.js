const router = require('express').Router();

const { admin } = require('./middlewares/employee-auth');

const LoginController = require('./controllers/LoginController');
const EmployeeController = require('./controllers/EmployeeController');

router.post('/login', LoginController.logInEmployee);

router.get('/employees', admin, EmployeeController.listEmployees);
router.get('/employees/:id', admin, EmployeeController.getEmployee);
router.post('/employees', admin, EmployeeController.createEmployee);
router.put('/employees/:id', admin, EmployeeController.updateEmployee);
router.delete('/employees/:id', admin, EmployeeController.deleteEmployee);

module.exports = router;
