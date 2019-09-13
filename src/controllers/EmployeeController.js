const { catchAndReturnAPIError } = require('../utils/rest');
const EmployeeService = require('../services/EmployeeService');

async function listEmployees(request, response) {
  try {
    const employees = await EmployeeService.listEmployees();
    return response.status(200).json(employees);
  } catch (error) {
    catchAndReturnAPIError(response, error);
  }
}

async function getEmployee(request, response) {
  try {
    const { id } = request.params;
    const employee = await EmployeeService.getEmployee(id);
    return response.status(200).json(employee);
  } catch (error) {
    catchAndReturnAPIError(response, error);
  }
}

async function createEmployee(request, response) {
  try {
    const employeeParams = request.body;
    const employee = await EmployeeService.createEmployee(employeeParams);
    return response.status(200).json(employee);
  } catch (error) {
    catchAndReturnAPIError(response, error);
  }
}

async function updateEmployee(request, response) {
  try {
    const { id } = request.params;
    const valuesToUpdate = request.body;
    const employee = await EmployeeService.updateEmployee(id, valuesToUpdate);
    return response.status(200).json(employee);
  } catch (error) {
    catchAndReturnAPIError(response, error);
  }
}

module.exports = {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee
};
