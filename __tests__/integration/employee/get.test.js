const api = require('../global/api');

const {
  getAdminEmployee,
  getSocialWorkerEmployee,
  getClerkEmployee
} = require('../global/employee');

it('should get a unique user by id', async () => {
  const adminEmployee = await getAdminEmployee();

  const response = await api
    .get(`/api/employees/${adminEmployee.id}`)
    .set({ Authorization: adminEmployee.token });

  expect(response.body).toHaveProperty('id');
  expect(response.body.id).toEqual(adminEmployee.id);
  expect(response.body).toHaveProperty('name');
  expect(response.body.name).toEqual(adminEmployee.name);
  expect(response.body).not.toHaveProperty('password');
  expect(response.status).toBe(200);
});

it('should return error status 400 when try get a invalid user', async () => {
  const { token } = await getAdminEmployee();

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

  const {
    token: socialWorkerToken,
    id: socialWorkerId
  } = await getSocialWorkerEmployee();
  const { token: clerkToken, id: clerkId } = await getClerkEmployee();

  await requestGetEmployeeWithoutPermission(socialWorkerToken, socialWorkerId);
  await requestGetEmployeeWithoutPermission(clerkToken, clerkId);
});
