'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'employee_rules',
      [
        {
          description: 'admin'
        },
        {
          description: 'social_worker'
        },
        {
          description: 'clerk'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('employee_rules', null, {});
  }
};
