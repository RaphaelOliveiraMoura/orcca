import faker from 'faker';
import { factory } from 'factory-girl';

import User from '~/app/models/User';
import Patient from '~/app/models/Patient';

factory.define('User', User, {
  name: () => faker.name.findName(),
  login: () => faker.name.firstName(),
  password: () => faker.internet.password(),
  cpf: () => faker.helpers.replaceSymbolWithNumber('###########'),
  rule_id: () => faker.random.number({ min: 1, max: 3 }),
});

factory.define('Patient', Patient, {
  name: () => faker.name.findName(),
  birth_date: () => faker.date.past().toISOString(),
});

export default factory;
