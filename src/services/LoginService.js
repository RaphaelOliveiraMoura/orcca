const { throwResponseStatusAndMessage } = require('../utils/rest');
const { Employees } = require('../models');
const { compare } = require('../utils/encrypt');
const jwt = require('../utils/jwt');

async function logInEmployee(login, password) {
  if (!login || !password) throwResponseStatusAndMessage(400, 'Invalid params');
  const employeeExists = await Employees.findOne({
    include: ['rule'],
    where: { login }
  });
  if (!employeeExists) throwResponseStatusAndMessage(400, 'Invalid login');

  const employee = employeeExists.dataValues;
  const employeePassword = employeeExists.authentication.password;

  if (!compare(employeePassword, password))
    throwResponseStatusAndMessage(400, 'Password invalid');
  const token = jwt.generateToken(employee.id, employee.rule.name);
  return {
    ...employee,
    password: undefined,
    rule_id: undefined,
    token
  };
}

module.exports = {
  logInEmployee
};
