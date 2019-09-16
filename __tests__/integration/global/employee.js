const api = require('./api');
const { Employees } = require('../../../src/models/index');
const faker = require('./faker');

const employeeAdmin = {
  ...faker.generateRandomEmployee({
    ruleId: 1
  })
};
const employeeSocialWorker = {
  ...faker.generateRandomEmployee({
    ruleId: 2
  })
};

const employeeClerk = {
  ...faker.generateRandomEmployee({
    ruleId: 3
  })
};

async function findAndgetAllInformationsAboutEmployee(employee) {
  const [employeeAlreadyExists] = await Employees.findAll({
    where: { login: employee.login },
    raw: true
  });
  if (!employeeAlreadyExists) {
    await Employees.create(employee);
  }
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

async function getAdminEmployee() {
  return await findAndgetAllInformationsAboutEmployee(employeeAdmin);
}

async function getSocialWorkerEmployee() {
  return await findAndgetAllInformationsAboutEmployee(employeeSocialWorker);
}

async function getClerkEmployee() {
  return await findAndgetAllInformationsAboutEmployee(employeeClerk);
}

async function createNewEmployee(params) {
  const employee = faker.generateRandomEmployee(params);
  const createdEmployee = await Employees.create(employee);
  return createdEmployee.get({ plain: true });
}

module.exports = {
  getAdminEmployee,
  getSocialWorkerEmployee,
  getClerkEmployee,
  createNewEmployee
};
