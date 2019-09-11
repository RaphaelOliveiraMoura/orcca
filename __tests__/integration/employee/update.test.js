const faker = require('../global/faker');

const api = require('../global/api');

const {
  getAdminEmployee,
  getSocialWorkerEmployee,
  getClerkEmployee
} = require('../global/employee');

async function createEmployee() {
  const { token } = await getAdminEmployee();
  const employee = faker.employee();
  const { status, body: createdEmployee } = await api
    .post('/api/employee')
    .set({ Authorization: token })
    .send(employee);

  expect(status).toBe(200);
  expect(createdEmployee).toHaveProperty('id');
  return createdEmployee;
}

it('should create and update a employee in database when a admin make the request', async () => {
  const { token } = await getAdminEmployee();
  const createdEmployee = await createEmployee();

  const updatedEmployee = {
    ...createdEmployee,
    name: faker.generate.name.findName(),
    login: faker.generate.name.firstName()
  };

  const response = await api
    .put(`/api/employee/${createdEmployee.id}`)
    .set({ Authorization: token })
    .send(updatedEmployee);

  expect(response.body).toHaveProperty('name');
  expect(response.body.name).toEqual(updatedEmployee.name);
  expect(response.body.login).toEqual(updatedEmployee.login);
  expect(response.body).not.toHaveProperty('password');
  expect(response.status).toBe(200);
});

it('should return error when try update employee without permission', async () => {
  const createdEmployee = await createEmployee();

  async function requestCreateEmployeeWithoutPermission(token) {
    const updatedEmployee = {
      ...createdEmployee,
      name: faker.generate.name.findName(),
      login: faker.generate.name.firstName()
    };

    const response = await api
      .put(`/api/employee/${createdEmployee.id}`)
      .set({ Authorization: token })
      .send(updatedEmployee);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  const { token: socialWorkerToken } = await getSocialWorkerEmployee();
  const { token: clerkToken } = await getClerkEmployee();

  await requestCreateEmployeeWithoutPermission(socialWorkerToken);
  await requestCreateEmployeeWithoutPermission(clerkToken);
});
