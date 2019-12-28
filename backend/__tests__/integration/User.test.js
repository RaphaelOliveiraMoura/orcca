import request from 'supertest';

import app from '~/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Users', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able create a new user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });

  it('should get error when try create a duplicated user', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should get error when try create a user with invalid params', async () => {
    const user = await factory.attrs('User');

    const invalidUser = {
      ...user,
      rule_id: 'invalid_param',
    };

    const response = await request(app)
      .post('/users')
      .send(invalidUser);

    expect(response.status).toBe(400);
  });

  it('should get error when try create a user with invalid rule id', async () => {
    const user = await factory.attrs('User');

    const invalidUser = {
      ...user,
      rule_id: 20,
    };

    const response = await request(app)
      .post('/users')
      .send(invalidUser);

    expect(response.status).toBe(400);
  });
});
