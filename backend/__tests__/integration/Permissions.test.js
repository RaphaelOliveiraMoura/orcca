import request from 'supertest';

import app from '~/app';

import factory from '../factories';
import truncate from '../util/truncate';

import getToken from '../util/tokens';

let socialWorkerToken;
let clerkToken;

describe('Users', () => {
  beforeAll(async () => {
    await truncate();
    socialWorkerToken = await getToken({ rule: 'socialWorker' });
    clerkToken = await getToken({ rule: 'clerk' });
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should get error when a clerk try access a admin route', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .set({ Authorization: `Bearer ${clerkToken}` })
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should get error when a social worker try access a admin route', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .set({ Authorization: `Bearer ${socialWorkerToken}` })
      .send(user);

    expect(response.status).toBe(401);
  });
});
