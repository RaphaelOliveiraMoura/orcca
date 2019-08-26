'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'employees',
      [
        {
          name: 'Raphael de Oliveira Moura',
          cpf: '12717273662',
          rule_id: 1,
          birth_date: '1999-08-26',
          login: 'raphael',
          password: 'raphael',
          phone_number: '31998204295'
        },
        {
          name: 'Amanda Galvão Baece',
          cpf: '12717702565',
          rule_id: 2,
          birth_date: '2000-07-25',
          login: 'amanda',
          password: 'amanda123',
          phone_number: '31998226585'
        },
        {
          name: 'Bruno Santos',
          cpf: '17568525665',
          rule_id: 3,
          birth_date: '2001-03-12',
          login: 'bruno',
          password: 'santos2017',
          phone_number: '31998653256'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('employees', null, {});
  }
};
