const Sequelize = require('sequelize');
const databaseConfigurations = require('../config/database');

const sequelize = new Sequelize(databaseConfigurations);

module.exports = sequelize;
