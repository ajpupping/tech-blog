'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        username: 'user1',
        password: 'password123'
      },
      {
        username: 'user2',
        password: 'password456'
      }
    ];
    // Hash passwords 
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    await queryInterface.bulkInsert('Users', users, {});

    await queryInterface.bulkInsert('Posts', [{
      title: 'First Post',
      content: 'This is the content of the first post.',
      userId: 1, 
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Second Post',
      content: 'This is the content of the second post.',
      userId: 2, 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};

