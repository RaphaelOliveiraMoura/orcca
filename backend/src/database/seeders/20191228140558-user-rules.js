module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'user_rules',
      [
        {
          id: 1,
          name: 'Administrador',
          description: 'Has access of all functionalities in the plataform',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Social Worker',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Clerk',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('user_rules', null, {});
  },
};
