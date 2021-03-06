'use strict';

let {hashPass} = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Users',[{
    email: 'admin@mail.com',
    password: hashPass('1234'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
   },
   {
    email: 'customer@mail.com',
    password: hashPass('1234'),
    role: 'customer',
    createdAt: new Date(),
    updatedAt: new Date()
   }
  ],{})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
