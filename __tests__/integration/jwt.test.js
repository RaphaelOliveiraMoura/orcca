const { app } = require('../../src/app');
const api = require('supertest')(app);

it('should return the jwt token when send the correct credentials to login', async () => {
  const response = await api.post('/api/login').send({
    login: 'douglas123',
    password: 'senhanova123'
  });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
});

it('should return a invalid error when try to do login with invalid credentials', async () => {
  async function requestLoginWithInvalidVerification(params) {
    await api
      .post('/api/login')
      .send(params)
      .expect(response => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
      });
  }

  requestLoginWithInvalidVerification({
    login: 'douglas123',
    password: 'senhaerrada'
  });
  requestLoginWithInvalidVerification({
    login: '',
    password: 'senhaerrada'
  });
  requestLoginWithInvalidVerification({
    login: 'douglas123',
    password: ''
  });
  requestLoginWithInvalidVerification({ password: 'senhaerrada' });
  requestLoginWithInvalidVerification({});
});
