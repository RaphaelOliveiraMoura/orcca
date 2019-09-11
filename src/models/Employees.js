'use strict';
const { encrypt } = require('../utils/encrypt');

module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define(
    'Employees',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      birthDate: {
        field: 'birth_date',
        type: DataTypes.DATEONLY
      },
      phoneNumber: {
        field: 'phone_number',
        type: DataTypes.STRING
      },
      ruleId: {
        field: 'rule_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'EmployeeRules',
          key: 'id'
        }
      }
    },
    {
      tableName: 'employees',
      hooks: {
        beforeValidate: (employee, options) => {
          employee.password = encrypt(employee.password);
        }
      }
    }
  );
  Employees.associate = function(models) {
    Employees.belongsTo(models.EmployeeRules, {
      as: 'rule',
      foreignKey: 'ruleId'
    });
  };
  return Employees;
};
