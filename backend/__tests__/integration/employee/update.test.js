const {
  api,
  FakerWrapper,
  EmployeesController,
  DatabaseController
} = require('../global');

const { Employees } = require('../../../src/models');

beforeAll(async () => {
  await DatabaseController.prepareDatabase();
});

it('should create and update a employee in database when a admin make the request', async () => {
  const { token } = await EmployeesController.admin();

  const createdResponse = await Employees.create(
    FakerWrapper.generateRandomEmployee()
  );
  const createdEmployee = createdResponse.dataValues;

  const updatedEmployee = {
    ...createdEmployee,
    name: FakerWrapper.generate.name.findName(),
    login: FakerWrapper.generate.name.firstName()
  };

  const response = await api
    .put(`/api/employees/${createdEmployee.id}`)
    .set({ Authorization: token })
    .send(updatedEmployee);

  expect(response.body).toHaveProperty('name');
  expect(response.body.name).toEqual(updatedEmployee.name);
  expect(response.body.login).toEqual(updatedEmployee.login);
  expect(response.body).not.toHaveProperty('password');
  expect(response.status).toBe(200);
});

it('should return error when try update employee without permission', async () => {
  const createdResponse = await Employees.create(
    FakerWrapper.generateRandomEmployee()
  );
  const createdEmployee = createdResponse.dataValues;

  async function requestCreateEmployeeWithoutPermission(token) {
    const updatedEmployee = {
      ...createdEmployee,
      name: FakerWrapper.generate.name.findName(),
      login: FakerWrapper.generate.name.firstName()
    };

    const response = await api
      .put(`/api/employees/${createdEmployee.id}`)
      .set({ Authorization: token })
      .send(updatedEmployee);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  }

  const { token: socialWorkerToken } = await EmployeesController.socialWorker();
  const { token: clerkToken } = await EmployeesController.clerk();

  await requestCreateEmployeeWithoutPermission(socialWorkerToken);
  await requestCreateEmployeeWithoutPermission(clerkToken);
});
