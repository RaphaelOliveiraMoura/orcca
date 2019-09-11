'use strict';
module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define(
    'States',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      uf: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      tableName: 'states'
    }
  );
  return States;
};
