'use strict';
module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define(
    'States',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
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
