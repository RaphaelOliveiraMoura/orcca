const api = require('./api');

const { Employees } = require('../../../src/models');
const DatabaseController = require('./DatabaseController');

async function loginWithEmployee(employee) {
  const { body } = await api.post('/api/login').send({
    login: employee.login,
    password: employee.password
  });
  return {
    ...employee,
    id: body.id,
    token: `Bearer ${body.token}`
  };
}

const admin = async function() {
  return await loginWithEmployee(DatabaseController.employees[0]);
};

const socialWorker = async function() {
  return await loginWithEmployee(DatabaseController.employees[1]);
};

const clerk = async function() {
  return await loginWithEmployee(DatabaseController.employees[2]);
};

const random = async function() {
  const [employee] = await Employees.findAll({ raw: true });
  return employee;
};

module.exports = {
  admin,
  socialWorker,
  clerk,
  random
};
