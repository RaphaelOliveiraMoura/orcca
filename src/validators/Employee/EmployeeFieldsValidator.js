const { Op } = require('sequelize');
const { Employees, EmployeeRules } = require('../../models/index');
const {
  throwResponseStatusAndMessage,
  catchAndReturnAPIError,
  validateParams
} = require('../../utils/rest');

async function validate(request, response, next) {
  try {
    const { name, cpf, login, password, birthDate, phoneNumber } = request.body;
    let { rule } = request.body;

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
    request.body.rule = employeeRule.id;

    next();
  } catch (error) {
    catchAndReturnAPIError(response, error);
  }
}

async function verifyIfEmployeeExists(login, cpf) {
  const [employeeAlreadyExists] = await Employees.findAll({
    where: { [Op.or]: [{ login }, { cpf }] },
    raw: true
  });

  if (employeeAlreadyExists) {
    throwResponseStatusAndMessage(400, 'Employee already exists');
  }
}

async function verifyIfEmployeeRuleExists(rule) {
  const [ruleExists] = await EmployeeRules.findAll({
    where: { [Op.or]: [{ id: rule }, { name: rule }] },
    raw: true
  });

  if (!ruleExists) {
    throwResponseStatusAndMessage(400, 'Invalid rule to employee');
  }

  return ruleExists;
}

module.exports = {
  validate
};
