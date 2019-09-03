'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define(
    'Cities',
    {
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
