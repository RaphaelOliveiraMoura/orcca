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
        },
        afterFind: (employee, options) => {
          if (!employee) return employee;

          const hiddenPasswordOnObject = employee => {
            if (employee.getDataValue) {
              const password = employee.getDataValue('password');
              employee.authentication = { password };
              employee.setDataValue('password', undefined);
            } else {
              employee.password = undefined;
            }
          };

          if (Array.isArray(employee)) {
            employee.forEach(currentEmployee => {
              hiddenPasswordOnObject(currentEmployee);
            });
          } else {
            hiddenPasswordOnObject(employee);
          }
          return employee;
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
