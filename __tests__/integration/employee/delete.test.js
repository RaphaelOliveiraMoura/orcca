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
    .post('/api/employees')
    .set({ Authorization: token })
    .send(employee);

  expect(createdEmployee).toHaveProperty('id');
  expect(status).toBe(200);
  return createdEmployee;
}

it('should delete a employee in database when a admin make the request', async () => {
  const { token } = await getAdminEmployee();
  const createdEmployee = await createEmployee();

  const response = await api
    .delete(`/api/employees/${createdEmployee.id}`)
    .set({ Authorization: token });

  expect(response.body).not.toHaveProperty('error');
  expect(response.status).toBe(200);
});

it('should return error when try delete a invalid employee', async () => {
  const { token } = await getAdminEmployee();

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
  const createdEmployee = await createEmployee();

  async function requestDeleteEmployeeWithoutPermission(token) {
    const response = await api
      .delete(`/api/employees/${createdEmployee.id}`)
      .set({ Authorization: token });

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  const { token: socialWorkerToken } = await getSocialWorkerEmployee();
  const { token: clerkToken } = await getClerkEmployee();

  await requestDeleteEmployeeWithoutPermission(socialWorkerToken);
  await requestDeleteEmployeeWithoutPermission(clerkToken);
});
