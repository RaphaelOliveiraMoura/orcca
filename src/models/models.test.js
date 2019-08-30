const { Employees, EmployeeRules } = require('./index');

Employees.findAll({
  include: ['rule'],
  attributes: { exclude: ['ruleId'] }
}).then(response => {
  console.log(JSON.stringify(response, null, 2));
});

// EmployeeRules.findAll({}).then(response => {
//   console.log(JSON.stringify(response, null, 2));
// });

// Employees.create({
//   name: 'Douglas Santos',
//   cpf: '1271726532',
//   ruleId: 1,
//   birthDate: '1999-08-30',
//   login: 'douglas123',
//   password: 'senhanova123',
//   phoneNumber: '3135333526'
// }).then(response => {
//   console.log(JSON.stringify(response, null, 2));
// });

// Employees.update(
//   {
//     name: 'Douglas Santos Moraes',
//     ruleId: 2,
//     login: 'douglas123',
//     password: 'senhanova1234'
//   },
//   { where: { id: 4 } }
// ).then(response => {
//   console.log(JSON.stringify(response, null, 2));
// });
