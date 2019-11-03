const { api, EmployeesController, DatabaseController } = require('../global');

beforeAll(async () => {
  await DatabaseController.prepareDatabase();
});

it('should get a unique user by id', async () => {
  const employee = await EmployeesController.random();
  const { token } = await EmployeesController.admin();

  const response = await api
    .get(`/api/employees/${employee.id}`)
    .set({ Authorization: token });

  expect(response.body).toHaveProperty('id');
  expect(response.body.id).toEqual(employee.id);
  expect(response.body).toHaveProperty('name');
  expect(response.body.name).toEqual(employee.name);
  expect(response.body).not.toHaveProperty('password');
  expect(response.status).toBe(200);
});

it('should return error status 400 when try get a invalid user', async () => {
  const { token } = await EmployeesController.admin();

  async function requestGetInvadliEmployee(id) {
    const response = await api
      .get(`/api/employees/${id}`)
      .set({ Authorization: token });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  await requestGetInvadliEmployee(-1);
  await requestGetInvadliEmployee('invalid');
});

it('should return error when try get a employee without permission', async () => {
  async function requestGetEmployeeWithoutPermission(token, id) {
    const response = await api
      .get(`/api/employees/${id}`)
      .set({ Authorization: token });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  const socialWorker = await EmployeesController.socialWorker();
  const clerk = await EmployeesController.clerk();

  await requestGetEmployeeWithoutPermission(
    socialWorker.token,
    socialWorker.id
  );
  await requestGetEmployeeWithoutPermission(clerk.token, clerk.id);
});
