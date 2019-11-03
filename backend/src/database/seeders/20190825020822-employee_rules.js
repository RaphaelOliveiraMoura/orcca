'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'employee_rules',
      [
        {
          name: 'admin',
          description: 'Administrador(a)'
        },
        {
          name: 'social_worker',
          description: 'Assistente Social'
        },
        {
          name: 'clerk',
          description: 'Atendente'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('SET FOREIGN_KEY_CHECKS = 0;')
      .then(() => {
        return queryInterface.bulkDelete('employee_rules', null, {
          truncate: true
        });
      })
      .then(() => {
        return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
      });
  }
};
