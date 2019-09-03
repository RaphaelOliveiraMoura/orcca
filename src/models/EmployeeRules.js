'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeRules = sequelize.define(
    'EmployeeRules',
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      tableName: 'employee_rules',
      timestamps: false
    }
  );
  return EmployeeRules;
};
