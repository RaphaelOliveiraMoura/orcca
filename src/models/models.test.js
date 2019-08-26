const { Employees, EmployeeRules } = require('./index');

Employees.findAll({
  include: [EmployeeRules]
}).then(response => {
  console.log(JSON.stringify(response, null, 2));
});

EmployeeRules.findAll({}).then(response => {
  console.log(JSON.stringify(response, null, 2));
});
