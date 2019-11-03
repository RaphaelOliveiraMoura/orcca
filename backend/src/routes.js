const expressRouter = require('express').Router();
const RouterBuilder = require('./utils/RouterBuilder');
const router = new RouterBuilder(expressRouter);

const { admin } = require('./middlewares/employee-auth');

const LoginController = require('./controllers/LoginController');
const EmployeeController = require('./controllers/EmployeeController');

const EmployeeValidators = require('./validators/Employee');

router.post('/login', LoginController.logInEmployee).build();

router
  .get('/employees', EmployeeController.listEmployees)
  .withAuth(admin)
  .build();

router
  .get('/employees/:id', EmployeeController.getEmployee)
  .withAuth(admin)
  .withValidation(EmployeeValidators.find)
  .build();

router
  .post('/employees', EmployeeController.createEmployee)
  .withAuth(admin)
  .withValidation(EmployeeValidators.fields)
  .build();

router
  .put('/employees/:id', EmployeeController.updateEmployee)
  .withAuth(admin)
  .withValidation(EmployeeValidators.update)
  .build();

router
  .delete('/employees/:id', EmployeeController.deleteEmployee)
  .withAuth(admin)
  .withValidation(EmployeeValidators.find)
  .build();

module.exports = router.router;
