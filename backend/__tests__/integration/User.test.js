import request from 'supertest';

import app from '~/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Users', async () => {
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
});
