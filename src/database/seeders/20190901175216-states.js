'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'states',
      [
        {
          uf: 'AC',
          description: 'Acre'
        },
        {
          uf: 'AL',
          description: 'Alagoas'
        },
        {
          uf: 'AP',
          description: 'Amapá'
        },
        {
          uf: 'AM',
          description: 'Amazonas'
        },
        {
          uf: 'BA',
          description: 'Bahia'
        },
        {
          uf: 'CE',
          description: 'Ceará'
        },
        {
          uf: 'DF',
          description: 'Distrito Federal'
        },
        {
          uf: 'ES',
          description: 'Espírito Santo'
        },
        {
          uf: 'GO',
          description: 'Goiás'
        },
        {
          uf: 'MA',
          description: 'Maranhão'
        },
        {
          uf: 'MT',
          description: 'Mato Grosso'
        },
        {
          uf: 'MS',
          description: 'Mato Grosso do Sul'
        },
        {
          uf: 'MG',
          description: 'Minas Gerais'
        },
        {
          uf: 'PA',
          description: 'Pará'
        },
        {
          uf: 'PB',
          description: 'Paraíba'
        },
        {
          uf: 'PR',
          description: 'Paraná'
        },
        {
          uf: 'PE',
          description: 'Pernambuco'
        },
        {
          uf: 'PI',
          description: 'Piauí'
        },
        {
          uf: 'RJ',
          description: 'Rio de Janeiro'
        },
        {
          uf: 'RN',
          description: 'Rio Grande do Norte'
        },
        {
          uf: 'RS',
          description: 'Rio Grande do Sul'
        },
        {
          uf: 'RO',
          description: 'Rondônia'
        },
        {
          uf: 'RR',
          description: 'Roraima'
        },
        {
          uf: 'SC',
          description: 'Santa Catarina'
        },
        {
          uf: 'SP',
          description: 'São Paulo'
        },
        {
          uf: 'SE',
          description: 'Sergipe'
        },
        {
          uf: 'TO',
          description: 'Tocantins'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('states', null, {});
  }
};
