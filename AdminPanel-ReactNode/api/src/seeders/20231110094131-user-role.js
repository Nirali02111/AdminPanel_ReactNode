'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [{
      name: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
