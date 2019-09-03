const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

const db = {};

const validModelFile = fileName =>
  fileName.indexOf('.') !== 0 &&
  fileName !== path.basename(__filename) &&
  fileName.slice(-3) === '.js' &&
  !fileName.includes('test');

fs.readdirSync(__dirname)
  .filter(validModelFile)
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = {
  ...db,
  sequelize,
  Sequelize
};
