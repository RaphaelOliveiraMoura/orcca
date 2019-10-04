const router = require('express').Router();

const EmployeeSessionMiddleware = require('../middlewares/EmployeeSessionMiddleware');

const LoginController = require('../controllers/LoginController');
const EmployeeController = require('../controllers/EmployeeController');

const EmployeeValidators = require('../validators/Employee');

router.post('/login', LoginController.logInEmployee);

/** Apply authentication middleware for all after roiutes */
router.use(EmployeeSessionMiddleware.admin);

/**
 * List all employees
 */
router.get('/employees', EmployeeController.listEmployees);

/**
 * Get informations about specific employee
 */
router.get(
  '/employees/:id',
  ...[EmployeeValidators.find, EmployeeController.getEmployee]
);

/**
 * Create a employee in database
 */
router.post(
  '/employees',
  ...[EmployeeValidators.fields, EmployeeController.createEmployee]
);

/**
 * Update informations about employee
 */
router.put(
  '/employees/:id',
  ...[EmployeeValidators.update, EmployeeController.updateEmployee]
);

/**
 * Delete a specific employee
 */
router.delete(
  '/employees/:id',
  ...[EmployeeValidators.find, EmployeeController.deleteEmployee]
);

module.exports = router;
