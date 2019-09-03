const { Employees } = require('../models');
const {
  throwResponseStatusAndMessage,
  catchAndReturnAPIError
} = require('../utils/rest');
const jwt = require('../utils/jwt');

const ADMIN_RULE_NAME = 'admin';
const SOCIAL_WORKER_RULE_NAME = 'social_worker';
const CLERK_RULE_NAME = 'clerk';

async function authenticate(request, response, next, ruleName) {
  try {
    const { authorization } = request.headers;
    const payload = verifyToken(authorization);
    const employee = await verifyRule(payload.id, ruleName);
    request.employee = employee;
    return next();
  } catch (error) {
    catchAndReturnAPIError(response, error);
  }
}

function verifyToken(authorization) {
  if (!authorization)
    throwResponseStatusAndMessage(
      400,
      'You need provide the JWT token in header'
    );

  const [bearer, token] = authorization;
  if (!bearer || !token)
    throwResponseStatusAndMessage(400, 'Invalid token formmat');

  const payload = jwt.verifyToken(token);

  if (!payload || !payload.id || !payload.rule)
    throwResponseStatusAndMessage(400, 'Invalid JWT token');

  return payload;
}

async function verifyRule(employeeId, ruleName) {
  const employeeExists = await Employees.findByPk(employeeId, {
    include: ['rule'],
    attributes: { exclude: ['ruleId', 'password'] }
  });

  if (!employeeExists)
    throwResponseStatusAndMessage(400, 'This is a token of a invalid employee');

  const employee = employeeExists.dataValues;
  if (employee.rule.description != ruleName)
    throwResponseStatusAndMessage(
      400,
      'You dont have permission to access this resource'
    );

  return employee;
}

module.exports = {
  admin: (request, response, next) =>
    authenticate(request, response, next, ADMIN_RULE_NAME),

  socialWorker: (request, response, next) =>
    authenticate(request, response, next, SOCIAL_WORKER_RULE_NAME),

  clerk: (request, response, next) =>
    authenticate(request, response, next, CLERK_RULE_NAME)
};
