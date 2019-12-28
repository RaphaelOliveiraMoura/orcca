import request from 'supertest';

import factory from '../factories';

import app from '~/app';

export async function admin() {
  const user = await factory.create('User', {
    rule_id: 1,
  });

  const response = await request(app)
    .post('/sessions')
    .send({ login: user.login, password: user.password });

  return response.body.token;
}

export async function socialWorker() {
  const user = await factory.create('User', {
    rule_id: 2,
  });

  const response = await request(app)
    .post('/sessions')
    .send({ login: user.login, password: user.password });

  return response.body.token;
}

export async function clerk() {
  const user = await factory.create('User', {
    rule_id: 3,
  });

  const response = await request(app)
    .post('/sessions')
    .send({ login: user.login, password: user.password });

  return response.body.token;
}
