import Patient from '~/app/models/Patient';

class PatientController {
  async index(request, response) {
    const patients = await Patient.findAll();

    return response.json(patients);
  }

  async show(request, response) {
    const patient = await Patient.findByPk(request.params.id);

    if (!patient) {
      return response.status(400).json({ error: 'Patient does not exists' });
    }

    return response.json(patient);
  }

  async store(request, response) {
    const patient = await Patient.create(request.body);

    return response.status(201).json(patient);
  }

  async update(request, response) {
    const patient = await Patient.findByPk(request.params.id);

    if (!patient) {
      return response.status(400).json({ error: 'Patient does not exists' });
    }

    await patient.update(request.body);

    return response.json(patient);
  }

  async destroy(request, response) {
    const patient = await Patient.findByPk(request.params.id);

    if (!patient) {
      return response.status(400).json({ error: 'Patient does not exists' });
    }

    await patient.destroy(request.body);

    return response.json({ message: 'Patient deleted with success' });
  }
}

export default new PatientController();
