const faker = require('../global/faker');

const api = require('../global/api');

const {
  getAdminEmployee,
  getSocialWorkerEmployee,
  getClerkEmployee
} = require('../global/employee');

it('should create a employee in database when a admin make the request', async () => {
  const employee = {
    ...faker.generateRandomEmployee(),
    ruleId: undefined,
    rule: faker.generate.random.number({ min: 1, max: 3 })
  };

  const { token } = await getAdminEmployee();

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
  const { token } = await getAdminEmployee();

  async function requestCreateEmployeeWithInvalidParams(params) {
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
    faker.generateRandomEmployee({ name: '', cpf: '', password: undefined })
  );
  await requestCreateEmployeeWithInvalidParams(
    faker.generateRandomEmployee({ name: '', cpf: '' })
  );
});

it('should return error when try create employee without permission', async () => {
  async function requestCreateEmployeeWithoutPermission(token) {
    const response = await api
      .post('/api/employees')
      .set({ Authorization: token })
      .send(faker.generateRandomEmployee());

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  const { token: socialWorkerToken } = await getSocialWorkerEmployee();
  const { token: clerkToken } = await getClerkEmployee();

  await requestCreateEmployeeWithoutPermission(socialWorkerToken);
  await requestCreateEmployeeWithoutPermission(clerkToken);
});
