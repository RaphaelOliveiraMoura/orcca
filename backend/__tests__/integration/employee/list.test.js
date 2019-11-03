const { api, EmployeesController, DatabaseController } = require('../global');

beforeAll(async () => {
  await DatabaseController.prepareDatabase();
});

it('should return a list with all employees', async () => {
  const { token } = await EmployeesController.admin();

  const response = await api
    .get('/api/employees')
    .set({ Authorization: token });

  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBeGreaterThan(0);
  expect(response.status).toBe(200);
});

it('should return error when try list employees without permission', async () => {
  async function requestListEmployeeWithoutPermission(token) {
    const response = await api
      .get('/api/employees')
      .set({ Authorization: token });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  const { token: socialWorkerToken } = await EmployeesController.socialWorker();
  const { token: clerkToken } = await EmployeesController.clerk();

  await requestListEmployeeWithoutPermission(socialWorkerToken);
  await requestListEmployeeWithoutPermission(clerkToken);
});
