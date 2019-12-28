import faker from 'faker';
import { factory } from 'factory-girl';

import User from '~/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  login: faker.name.firstName(),
  password: faker.internet.password(),
  cpf: faker.helpers.replaceSymbolWithNumber('###########'),
  rule_id: faker.random.number({ min: 1, max: 3 }),
});

export default factory;
