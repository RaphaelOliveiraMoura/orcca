const { Op } = require('sequelize');
const { Employees, EmployeeRules } = require('../../models/index');
const {
  throwResponseStatusAndMessage,
  catchAndReturnAPIError
} = require('../../utils/rest');

async function validate(request, response, next) {
  try {
    const { id } = request.params;
    const { rule } = request.body;

    await verifyIfEmployeeExists(id);

    if (rule) {
      const employeeRule = await verifyIfEmployeeRuleExists(rule);
      request.body.rule = employeeRule.id;
    }

    next();
  } catch (error) {
    catchAndReturnAPIError(response, error);
  }
}

async function verifyIfEmployeeExists(id) {
  const [employeeAlreadyExists] = await Employees.findAll({
    where: { id },
    raw: true
  });

  if (!employeeAlreadyExists) {
    throwResponseStatusAndMessage(400, 'Employee does not exists');
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

module.exports = {
  validate
};
