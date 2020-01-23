import request from 'supertest';

import app from '~/app';

import User from '~/app/models/User';

import factory from '../factories';
import truncate from '../util/truncate';

import getToken from '../util/tokens';

let adminToken;
let clerkToken;

describe('Users', () => {
  beforeAll(async () => {
    await truncate();
    adminToken = await getToken({ rule: 'admin' });
    clerkToken = await getToken({ rule: 'clerk' });
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should be able create a new user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .set({ Authorization: `Bearer ${adminToken}` })
      .send(user);

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });

  it('should get error when try create a duplicated user', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .set({ Authorization: `Bearer ${adminToken}` })
      .send(user);

    const response = await request(app)
      .post('/users')
      .set({ Authorization: `Bearer ${adminToken}` })
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
      .set({ Authorization: `Bearer ${adminToken}` })
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
      .set({ Authorization: `Bearer ${adminToken}` })
      .send(invalidUser);

    expect(response.status).toBe(400);
  });

  it('should return a list of all users', async () => {
    await factory.createMany('User', 5);

    const response = await request(app)
      .get('/users')
      .set({ Authorization: `Bearer ${adminToken}` });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    expect(response.body[0]).not.toHaveProperty('password_hash');
  });

  it('should return a unique user', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get(`/users/${user.id}`)
      .set({ Authorization: `Bearer ${adminToken}` });

    expect(response.status).toBe(200);
    expect(response.body.login).toBe(user.login);
    expect(response.body).not.toHaveProperty('password_hash');
  });

  it('should get error when try get informations about a invalid user', async () => {
    const response = await request(app)
      .get('/users/invalid_id')
      .set({ Authorization: `Bearer ${adminToken}` });

    expect(response.status).toBe(400);
  });

  it('should update a user information', async () => {
    const user = await factory.create('User', { rule_id: 2 });

    const tokenResponse = await request(app)
      .post('/sessions')
      .send({
        login: user.login,
        password: user.password,
      });

    const { token } = tokenResponse.body;

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: 'updated_name',
        login: 'updated_login',
        rule_id: undefined,
      });

    const updatedUser = await User.findByPk(user.id);

    expect(response.status).toBe(200);
    expect(updatedUser.name).toBe('updated_name');
    expect(updatedUser.login).toBe('updated_login');
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.login).toBe(updatedUser.login);
  });

  it('should block a common user to update another profile', async () => {
    const anotherUser = await factory.create('User');

    const response = await request(app)
      .put(`/users/${anotherUser.id}`)
      .set({ Authorization: `Bearer ${clerkToken}` })
      .send({
        login: 'updated_field',
      });

    expect(response.status).toBe(401);
  });

  it('should get error when try update a invalid user', async () => {
    const response = await request(app)
      .put('/users/invalid_user')
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({ login: 'updated_field' });

    expect(response.status).toBe(400);
  });

  it('should get error when try update a user with invalid params', async () => {
    const user = await factory.create('User');

    const tokenResponse = await request(app)
      .post('/sessions')
      .send({
        login: user.login,
        password: user.password,
      });

    const { token } = tokenResponse.body;

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ rule_id: 'invalid_rule_id_format' });

    expect(response.status).toBe(400);
  });

  it('should get error when a common user try upate your permissions', async () => {
    const user = await factory.create('User', {
      rule_id: 3,
    });

    const tokenResponse = await request(app)
      .post('/sessions')
      .send({
        login: user.login,
        password: user.password,
      });

    const { token } = tokenResponse.body;

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ rule_id: 1 });

    expect(response.status).toBe(400);
  });

  it('should delete a user', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set({ Authorization: `Bearer ${adminToken}` });

    expect(response.status).toBe(200);
  });

  it('should get error when try delete a invalid user', async () => {
    const response = await request(app)
      .delete('/users/invalid_user')
      .set({ Authorization: `Bearer ${adminToken}` });

    expect(response.status).toBe(400);
  });
});
