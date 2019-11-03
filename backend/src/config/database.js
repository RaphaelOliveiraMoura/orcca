const { envrironment, database, databaseTest } = require('./server');

const databaseConfigurations = envrironment == 'test' ? databaseTest : database;

module.exports = {
  ...databaseConfigurations
};
