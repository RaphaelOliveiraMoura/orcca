const api = require('./api');
const { Employees } = require('../../../src/models/index');
const faker = require('./faker');

const employeeAdmin = {
  ...faker.employee({
    rule: undefined
  }),
  ruleId: 1
};
const employeeSocialWorker = {
  ...faker.employee({
    rule: undefined
  }),
  ruleId: 2
};

const employeeClerk = {
  ...faker.employee({
    rule: undefined
  }),
  ruleId: 3
};

async function getAuthorizationToken(employee) {
  try {
    await Employees.create(employee);
  } finally {
    const { body } = await api.post('/api/login').send({
      login: employee.login,
      password: employee.password
    });
    return {
      ...employee,
      token: `Bearer ${body.token}`
    };
  }
}

async function getAdminEmployee() {
  return await getAuthorizationToken(employeeAdmin);
}

async function getSocialWorkerEmployee() {
  return await getAuthorizationToken(employeeSocialWorker);
}

async function getClerkEmployee() {
  return await getAuthorizationToken(employeeClerk);
}

module.exports = {
  getAdminEmployee,
  getSocialWorkerEmployee,
  getClerkEmployee
};
