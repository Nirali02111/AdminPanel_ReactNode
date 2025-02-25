'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        field: 'Id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        field: 'Name',
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      shortDescription: {
        field: 'ShortDescription',
        type: Sequelize.STRING
      },
      status: {
        field: "Status",
        type: Sequelize.STRING,
        defaultValue: 'Active'
      },
      createdAt: {
        field: 'CreatedAt',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "UpdatedAt",
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        field: "DeletedAt",
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};