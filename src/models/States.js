'use strict';
module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define(
    'States',
    {
      uf: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      tableName: 'states'
    }
  );
  return States;
};
