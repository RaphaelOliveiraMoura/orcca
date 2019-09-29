const EmployeeFieldsValidator = require('./EmployeeFieldsValidator');
const EmployeeUpdateValidator = require('./EmployeeUpdateValidator');
const EmployeeFindValidator = require('./EmployeeFindValidator');

module.exports = {
  fields: EmployeeFieldsValidator.validate,
  update: EmployeeUpdateValidator.validate,
  find: EmployeeFindValidator.validate
};
