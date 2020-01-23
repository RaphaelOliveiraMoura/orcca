import request from 'supertest';

import factory from '../factories';

import app from '~/app';

export default async function getToken({ rule = 'admin' }) {
  const rules = {
    admin: 1,
    socialWorker: 2,
    clerk: 3,
  };

  const user = await factory.create('User', {
    rule_id: rules[rule],
  });

  const response = await request(app)
    .post('/sessions')
    .send({ login: user.login, password: user.password });

  return response.body.token;
}
