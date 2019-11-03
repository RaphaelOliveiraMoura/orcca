const { Employees } = require('../../models/index');
const {
  throwResponseStatusAndMessage,
  catchAndReturnAPIError
} = require('../../utils/rest');

async function validate(request, response, next) {
  try {
    const { id } = request.params;
    await verifyIfEmployeeExists(id);
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

module.exports = {
  validate
};
