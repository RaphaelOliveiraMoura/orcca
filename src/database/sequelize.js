const Sequelize = require('sequelize');
const databaseConfigurations = require('../config/database');

const {
  database,
  username,
  password,
  host,
  dialect,
  port
} = databaseConfigurations;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
  define: {
    paranoid: false,
    timestamps: true,
    freezeTableName: true,
    underscored: true
  }
});

module.exports = sequelize;
