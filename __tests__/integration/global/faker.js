const faker = require('faker');
const moment = require('moment');

function employee(params) {
  const randomEmployee = {
    name: faker.name.findName(),
    cpf: faker.random.number({
      min: 10000000000,
      max: 99999999999
    }),
    login: faker.name.firstName(),
    password: faker.random.alphaNumeric(12),
    birthDate: moment(faker.date.past()).format('YYYY-MM-DD'),
    phoneNumber: faker.random.number({
      min: 1000000000,
      max: 99999999999
    }),
    rule: faker.random.number({
      min: 1,
      max: 3
    }),
    ...params
  };

  const employeeWithoutUndefinedField = JSON.parse(
    JSON.stringify(randomEmployee)
  );

  return employeeWithoutUndefinedField;
}

module.exports = {
  employee,
  generate: faker
};
