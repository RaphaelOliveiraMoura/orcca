const { sequelize, Employees } = require('../../../src/models');

const employeeRulesSeeder = require('../../../src/database/seeders/20190825020822-employee_rules');
const statesSeeder = require('../../../src/database/seeders/20190901175216-states');

const employees = require('../data/emloyees');

/** Set Jest to await for promises with more then 30s */
jest.setTimeout(30000);

async function prepareDatabase() {
  /** Set database to accept change columns with foreign key */
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });

  /** Truncate all tables in database */
  await sequelize.sync({ force: true });

  /** Running all migrations */
  await employeeRulesSeeder.up(sequelize.queryInterface);
  await statesSeeder.up(sequelize.queryInterface);

  /** Inserting test informations in database */
  await Employees.bulkCreate(employees, { raw: true });

  /** Block changes in columns with foreign key */
  // await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
}

module.exports = {
  prepareDatabase,
  employees
};
