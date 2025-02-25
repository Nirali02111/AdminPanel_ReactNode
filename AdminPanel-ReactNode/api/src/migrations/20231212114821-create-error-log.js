'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ErrorLogs', {
      id: {
        field: 'Id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      log: {
        field: "Log",
        type: Sequelize.TEXT("long"),
      },
      timestamp: {
        field: "Timestamp",
        type: Sequelize.DATE
      },
      createdAt: {
        field: "CreatedAt",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "UpdatedAt",
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ErrorLogs');
  }
};