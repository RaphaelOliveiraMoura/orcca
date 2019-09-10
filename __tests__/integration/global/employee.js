const api = require('./api');
const { Employees } = require('../../../src/models/index');

const employeeAdmin = {
  name: 'AdminEmployee',
  cpf: '11111111111',
  login: 'admin',
  password: 'admin',
  birthDate: '1999-06-12',
  phoneNumber: '31999999999',
  ruleId: 1
};

const employeeSocialWorker = {
  name: 'SocialWorkerEmployee',
  cpf: '11111111111',
  login: 'socialworker',
  password: 'socialworker',
  birthDate: '1999-06-12',
  phoneNumber: '31999999999',
  ruleId: 2
};

const employeeClerk = {
  name: 'ClerkEmployee',
  cpf: '11111111111',
  login: 'clerk',
  password: 'clerk',
  birthDate: '1999-06-12',
  phoneNumber: '31999999999',
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
