const {
  api,
  FakerWrapper,
  EmployeesController,
  DatabaseController
} = require('../global');

beforeAll(async () => {
  await DatabaseController.prepareDatabase();
});

it('should create a employee in database when a admin make the request', async () => {
  const employee = {
    ...FakerWrapper.generateRandomEmployee(),
    ruleId: undefined,
    rule: FakerWrapper.generate.random.number({ min: 1, max: 3 })
  };

  const { token } = await EmployeesController.admin();

  const response = await api
    .post('/api/employees')
    .set({ Authorization: token })
    .send(employee);

  expect(response.body).toHaveProperty('name');
  expect(response.body.name).toEqual(employee.name);
  expect(response.body).not.toHaveProperty('password');
  expect(response.status).toBe(200);
});

it('should return error status 400 when try create a user with invalid params', async () => {
  async function requestCreateEmployeeWithInvalidParams(params) {
    const { token } = await EmployeesController.admin();

    const response = await api
      .post('/api/employees')
      .set({ Authorization: token })
      .send(params);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  await requestCreateEmployeeWithInvalidParams();
  await requestCreateEmployeeWithInvalidParams({});
  await requestCreateEmployeeWithInvalidParams(
    FakerWrapper.generateRandomEmployee({
      name: '',
      cpf: '',
      password: undefined
    })
  );
  await requestCreateEmployeeWithInvalidParams(
    FakerWrapper.generateRandomEmployee({ name: '', cpf: '' })
  );
});

it('should return error when try create employee without permission', async () => {
  async function requestCreateEmployeeWithoutPermission(token) {
    const response = await api
      .post('/api/employees')
      .set({ Authorization: token })
      .send(FakerWrapper.generateRandomEmployee());

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  const { token: socialWorkerToken } = await EmployeesController.socialWorker();
  const { token: clerkToken } = await EmployeesController.clerk();

  await requestCreateEmployeeWithoutPermission(socialWorkerToken);
  await requestCreateEmployeeWithoutPermission(clerkToken);
});
