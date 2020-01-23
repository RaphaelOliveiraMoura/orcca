import request from 'supertest';

import app from '~/app';

import Patient from '~/app/models/Patient';

import factory from '../factories';
import truncate from '../util/truncate';

import getToken from '../util/tokens';

let authToken;

describe('Users', () => {
  beforeAll(async () => {
    await truncate();
    authToken = await getToken({ rule: 'admin' });
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should be able create a new patient', async () => {
    const patient = await factory.attrs('Patient');

    const response = await request(app)
      .post('/patients')
      .set({ Authorization: `Bearer ${authToken}` })
      .send(patient);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(expect.objectContaining(patient));
  });

  it('should be able get informations about a specif patient', async () => {
    const patient = await factory.create('Patient');

    const response = await request(app)
      .get(`/patients/${patient.id}`)
      .set({ Authorization: `Bearer ${authToken}` });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining(JSON.parse(JSON.stringify(patient.toJSON())))
    );
  });

  it('should get error when try get information about invalid patient', async () => {
    const response = await request(app)
      .get('/patients/invalid_id')
      .set({ Authorization: `Bearer ${authToken}` });

    expect(response.status).toEqual(400);
  });

  it('should be able list all created patients', async () => {
    await factory.createMany('Patient', 5);

    const response = await request(app)
      .get('/patients')
      .set({ Authorization: `Bearer ${authToken}` });

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(5);
  });

  it('should be able update a created patient', async () => {
    const patient = await factory.create('Patient');

    const response = await request(app)
      .put(`/patients/${patient.id}`)
      .set({ Authorization: `Bearer ${authToken}` })
      .send({ name: 'Updated name' });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Updated name');
  });

  it('should get error when try updated a invalid patient', async () => {
    const response = await request(app)
      .put('/patients/invalid_id')
      .set({ Authorization: `Bearer ${authToken}` })
      .send({ name: 'Updated name' });

    expect(response.status).toEqual(400);
  });

  it('should be able delete a patient', async () => {
    const patient = await factory.create('Patient');

    const response = await request(app)
      .delete(`/patients/${patient.id}`)
      .set({ Authorization: `Bearer ${authToken}` });

    const patientExists = await Patient.findByPk(patient.id);

    expect(response.status).toEqual(200);
    expect(patientExists).toEqual(null);
  });

  it('should get error when try delete a invalid patient', async () => {
    const response = await request(app)
      .delete('/patients/invalid_id')
      .set({ Authorization: `Bearer ${authToken}` });

    expect(response.status).toEqual(400);
  });
});
