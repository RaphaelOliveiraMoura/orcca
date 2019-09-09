const { catchAndReturnAPIError } = require('../utils/rest');
const EmployeeService = require('../services/EmployeeService');

async function createEmployee(request, response) {
  try {
    const params = request.body;
    const employee = await EmployeeService.createEmployee(params);
    return response.status(200).json(employee);
  } catch (error) {
    catchAndReturnAPIError(response, error);
  }
}

module.exports = {
  createEmployee
};
