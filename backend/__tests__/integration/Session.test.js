import request from 'supertest';

import app from '~/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should return a token of session when submit correct credentials', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ login: user.login, password: user.password });

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });

  it('should get error when try login with a invalid login', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ login: 'invalid_user', password: '123456' });

    expect(response.status).toBe(400);
  });

  it('should get error when try login with a invalid password', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({ login: user.login, password: 'invalid_password' });

    expect(response.status).toBe(400);
  });

  it('should get error when try make a request without jwt token', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/create')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should get error when try make a request with a malformed token', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/create')
      .set({ Authorization: 'malforned_token' })
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should get error when try make a request with a invalid token', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/create')
      .set({ Authorization: 'Bearer invalid_token' })
      .send(user);

    expect(response.status).toBe(401);
  });
});
