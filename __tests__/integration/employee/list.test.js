const api = require('../global/api');

const {
  getAdminEmployee,
  getSocialWorkerEmployee,
  getClerkEmployee
} = require('../global/employee');

it('should return a list with all employees', async () => {
  const { token } = await getAdminEmployee();

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

  const { token: socialWorkerToken } = await getSocialWorkerEmployee();
  const { token: clerkToken } = await getClerkEmployee();

  await requestListEmployeeWithoutPermission(socialWorkerToken);
  await requestListEmployeeWithoutPermission(clerkToken);
});
