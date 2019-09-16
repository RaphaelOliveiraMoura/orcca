const faker = require('../global/faker');

const api = require('../global/api');

const {
  getAdminEmployee,
  getSocialWorkerEmployee,
  getClerkEmployee,
  createNewEmployee
} = require('../global/employee');

it('should delete a employee in database when a admin make the request', async () => {
  const { token } = await getAdminEmployee();
  const createdEmployee = await createNewEmployee();

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
  const createdEmployee = await createNewEmployee();

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
