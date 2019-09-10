const { app } = require('../../../src/app');
const api = require('supertest')(app);

it('should create a user in database', async () => {
  const employee = {
    name: 'Débora',
    cpf: '12717273112',
    login: 'debora',
    password: '123',
    birthDate: '1999-06-12',
    phoneNumber: '31998204295',
    rule: 1
  };

  const response = await api.post('/api/employee').send(employee);

  expect(response.body).toHaveProperty('name');
  expect(response.body.name).toEqual(employee.name);
  expect(response.body).not.toHaveProperty('password');
  expect(response.status).toBe(200);
});

it('should return error status 400 when try create a user with invalid params', async () => {
  async function requestCreateEmployeeWithInvalidParams(params) {
    const response = await api.post('/api/employee').send(params);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  await requestCreateEmployeeWithInvalidParams();
  await requestCreateEmployeeWithInvalidParams({});
  await requestCreateEmployeeWithInvalidParams({
    name: '',
    cpf: '',
    login: 'raphael',
    password: '123',
    birthDate: '1999-06-12',
    phoneNumber: '31998204295',
    rule: 1
  });
  await requestCreateEmployeeWithInvalidParams({
    name: '',
    cpf: '',
    birthDate: '1999-06-12',
    phoneNumber: '31998204295',
    rule: 1
  });
});
