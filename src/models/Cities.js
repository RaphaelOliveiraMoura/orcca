'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define(
    'Cities',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      stateId: {
        field: 'state_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'States',
          key: 'id'
        }
      }
    },
    {
      tableName: 'cities'
    }
  );
  Cities.associate = function(models) {
    Cities.belongsTo(models.States, {
      as: 'state',
      foreignKey: 'stateId'
    });
  };
  return Cities;
};
