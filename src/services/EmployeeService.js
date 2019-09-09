const { Op } = require('sequelize');
const Employees = require('../models/Employees');
const EmployeeRules = require('../models/EmployeeRules');
const { throwResponseStatusAndMessage } = require('../utils/rest');

async function createEmployee(employee) {
  const { name, cpf, login, password, birthDate, phoneNumber, rule } = employee;

  const [employeeAlreadyExists] = await Employees.findAll({
    where: {
      [Op.or]: [{ login }, { cpf }]
    },
    raw: true
  });

  if (employeeAlreadyExists) {
    throwResponseStatusAndMessage(400, 'Employee already exists');
  }

  const [ruleExists] = await EmployeeRules.findAll({
    where: {
      [Op.or]: [{ id: rule }, { name: rule }]
    },
    raw: true
  });

  if (ruleExists) {
    throwResponseStatusAndMessage(400, 'Invalid rule to employee');
  }

  const createdEmployee = await Employees.create({
    name,
    cpf,
    login,
    password,
    birthDate,
    phoneNumber,
    ruleId: ruleExists.id
  });

  return {
    ...createdEmployee,
    password: undefined
  };
}
