const faker = require('../global/faker');

const api = require('../global/api');

const {
  getAdminEmployee,
  getSocialWorkerEmployee,
  getClerkEmployee,
  createNewEmployee
} = require('../global/employee');

it('should create and update a employee in database when a admin make the request', async () => {
  const { token } = await getAdminEmployee();
  const createdEmployee = await createNewEmployee();

  const updatedEmployee = {
    ...createdEmployee,
    name: faker.generate.name.findName(),
    login: faker.generate.name.firstName()
  };

  const response = await api
    .put(`/api/employees/${createdEmployee.id}`)
    .set({ Authorization: token })
    .send(updatedEmployee);

  expect(response.body).toHaveProperty('name');
  expect(response.body.name).toEqual(updatedEmployee.name);
  expect(response.body.login).toEqual(updatedEmployee.login);
  expect(response.body).not.toHaveProperty('password');
  expect(response.status).toBe(200);
});

it('should return error when try update employee without permission', async () => {
  const createdEmployee = await createNewEmployee();

  async function requestCreateEmployeeWithoutPermission(token) {
    const updatedEmployee = {
      ...createdEmployee,
      name: faker.generate.name.findName(),
      login: faker.generate.name.firstName()
    };

    const response = await api
      .put(`/api/employees/${createdEmployee.id}`)
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
