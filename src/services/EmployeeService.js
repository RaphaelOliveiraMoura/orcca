const { Employees } = require('../models/index');

async function listEmployees() {
  const employees = await Employees.findAll({ raw: true });
  return employees;
}

async function getEmployee(id) {
  const employee = await Employees.findByPk(id, { raw: true });
  return employee;
}

async function createEmployee(employee) {
  const createdEmployee = await Employees.create(employee);

  return {
    ...createdEmployee.dataValues,
    password: undefined
  };
}

async function updateEmployee(id, employee) {
  const findedEmployee = await Employees.findByPk(id);

  const updatedEmployee = await findedEmployee.update(employee, {
    returning: true
  });

  return {
    ...updatedEmployee.dataValues,
    password: undefined
  };
}

async function deleteEmployee(id) {
  const result = await Employees.destroy({ where: { id } });
  return result;
}

module.exports = {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
