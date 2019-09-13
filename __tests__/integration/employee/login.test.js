const api = require('../global/api');
const { getAdminEmployee } = require('../global/employee');

it('should return the jwt token when send the correct credentials to login', async () => {
  const employee = await getAdminEmployee();

  const response = await api.post('/api/login').send({
    login: employee.login,
    password: employee.password
  });

  expect(response.body).toHaveProperty('token');
  expect(response.status).toBe(200);
});

it('should return a invalid error when try to do login with invalid credentials', async () => {
  async function requestLoginWithInvalidVerification(params) {
    await api
      .post('/api/login')
      .send(params)
      .expect(response => {
        expect(response.body).toHaveProperty('error');
        expect(response.status).toBe(400);
      });
  }

  await requestLoginWithInvalidVerification({
    login: 'douglas123',
    password: 'senhaerrada'
  });
  await requestLoginWithInvalidVerification({
    login: '',
    password: 'senhaerrada'
  });
  await requestLoginWithInvalidVerification({
    login: 'douglas123',
    password: ''
  });
  await requestLoginWithInvalidVerification({ password: 'senhaerrada' });
  await requestLoginWithInvalidVerification({});
});
