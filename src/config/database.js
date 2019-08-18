const databaseConfigurations = require('./server').database;

module.exports = {
  ...databaseConfigurations,
  operatorsAliases: false
};
