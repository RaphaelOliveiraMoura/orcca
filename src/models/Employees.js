'use strict';
const { encrypt } = require('../utils/encrypt');

const applyFunctionToObjectOrArray = (object, callback) => {
  if (!object) return object;

  if (Array.isArray(object)) {
    object.forEach(currentObj => {
      return callback(currentObj);
    });
  } else {
    return callback(object);
  }
};

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
        beforeBulkCreate: (employee, _options) => {
          return applyFunctionToObjectOrArray(employee, employee => {
            employee.password = encrypt(employee.password);
          });
        },
        beforeValidate: (employee, _options) => {
          return applyFunctionToObjectOrArray(employee, employee => {
            employee.password = encrypt(employee.password);
          });
        },
        afterFind: (employee, _options) => {
          const hiddenPasswordOnObject = employee => {
            if (employee.getDataValue) {
              const password = employee.getDataValue('password');
              employee.authentication = { password };
              employee.setDataValue('password', undefined);
            } else {
              employee.password = undefined;
            }
          };
          return applyFunctionToObjectOrArray(employee, hiddenPasswordOnObject);
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
