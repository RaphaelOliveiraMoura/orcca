const { Op } = require('sequelize');
const { Employees, EmployeeRules } = require('../models/index');
const {
  throwResponseStatusAndMessage,
  validateParams
} = require('../utils/rest');

async function verifyIfEmployeeExists(login, cpf) {
  const [employeeAlreadyExists] = await Employees.findAll({
    where: {
      [Op.or]: [{ login }, { cpf }]
    },
    raw: true
  });

  if (employeeAlreadyExists) {
    throwResponseStatusAndMessage(400, 'Employee already exists');
  }
}

async function verifyIfEmployeeRuleExists(rule) {
  const [ruleExists] = await EmployeeRules.findAll({
    where: {
      [Op.or]: [{ id: rule }, { name: rule }]
    },
    raw: true
  });

  if (!ruleExists) {
    throwResponseStatusAndMessage(400, 'Invalid rule to employee');
  }

  return ruleExists;
}

async function createEmployee(employee) {
  const { name, cpf, login, password, birthDate, phoneNumber, rule } = employee;

  validateParams([
    [name, 'name'],
    [cpf, 'cpf'],
    [login, 'login'],
    [password, 'password'],
    [birthDate, 'birth date'],
    [phoneNumber, 'phone number'],
    [rule, 'rule']
  ]);

  await verifyIfEmployeeExists(login, cpf);
  const employeeRule = await verifyIfEmployeeRuleExists(rule);

  const createdEmployee = await Employees.create({
    name,
    cpf,
    login,
    password,
    birthDate,
    phoneNumber,
    ruleId: employeeRule.id
  });

  return {
    ...createdEmployee.dataValues,
    password: undefined
  };
}

module.exports = {
  createEmployee
};
