const { catchAndReturnAPIError } = require('../utils/rest');
const LoginService = require('../services/LoginService');

async function logInEmployee(request, response) {
  try {
    const { login, password } = request.body;
    const employee = await LoginService.logInEmployee(login, password);
    return response.status(200).json(employee);
  } catch (error) {
    catchAndReturnAPIError(response, error);
  }
}

module.exports = {
  logInEmployee
};
