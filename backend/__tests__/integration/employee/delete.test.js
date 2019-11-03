const {
  api,
  FakerWrapper,
  EmployeesController,
  DatabaseController
} = require('../global');

const { Employees } = require('../../../src/models');

beforeAll(async () => {
  await DatabaseController.prepareDatabase();
});

it('should delete a employee in database when a admin make the request', async () => {
  const { token } = await EmployeesController.admin();

  const createdEmployee = await Employees.create(
    FakerWrapper.generateRandomEmployee(),
    { raw: true }
  );

  const response = await api
    .delete(`/api/employees/${createdEmployee.id}`)
    .set({ Authorization: token });

  expect(response.body).not.toHaveProperty('error');
  expect(response.status).toBe(200);
});

it('should return error when try delete a invalid employee', async () => {
  const { token } = await EmployeesController.admin();

  async function requestDeleteInvalidEmployee(id) {
    const response = await api
      .delete(`/api/employees/${id}`)
      .set({ Authorization: token });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  await requestDeleteInvalidEmployee('-55');
  await requestDeleteInvalidEmployee('sdffsdf');
});

it('should return error when try delete employee without permission', async () => {
  const createdEmployee = await Employees.create(
    FakerWrapper.generateRandomEmployee(),
    { raw: true }
  );

  async function requestDeleteEmployeeWithoutPermission(token) {
    const response = await api
      .delete(`/api/employees/${createdEmployee.id}`)
      .set({ Authorization: token });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  const { token: socialWorkerToken } = await EmployeesController.socialWorker();
  const { token: clerkToken } = await EmployeesController.clerk();

  await requestDeleteEmployeeWithoutPermission(socialWorkerToken);
  await requestDeleteEmployeeWithoutPermission(clerkToken);
});
