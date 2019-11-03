const Sequelize = require('sequelize');
const databaseConfigurations = require('../config/database');

const {
  database,
  username,
  password,
  host,
  dialect,
  port,
  logging
} = databaseConfigurations;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
  logging,
  define: {
    timestamps: true,
    freezeTableName: true,
    underscored: true
  }
});

module.exports = sequelize;
