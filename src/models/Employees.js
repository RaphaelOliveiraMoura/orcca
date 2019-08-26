'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define(
    'Employees',
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true
      },
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      phone_number: DataTypes.STRING,
      rule_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'EmployeeRules',
          key: 'id'
        }
      }
    },
    {
      tableName: 'employees'
    }
  );
  Employees.associate = function(models) {
    Employees.belongsTo(models.EmployeeRules, {
      foreignKey: 'rule_id'
    });
  };
  return Employees;
};
