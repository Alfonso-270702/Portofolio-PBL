'use strict';
const { encrypt } = require('../helpers/bcrypt');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          fullName: 'Dummy Admin',
          email: 'dumm_adminy@gmail.com',
          password: encrypt('Dummy@1'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
