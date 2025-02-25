"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AuditLogs", {
      id: {
        field: "Id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        field: "UserName",
        type: Sequelize.STRING,
      },
      actionType: {
        field: "ActionType",
        type: Sequelize.STRING,
      },
      activity: {
        field: "Activity",
        type: Sequelize.STRING,
      },
      timestamp: {
        field: "Timestamp",
        type: Sequelize.DATE,
      },
      details: {
        field: "Details",
        type: Sequelize.TEXT("long"),
      },
      createdAt: {
        field: "CreatedAt",
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "UpdatedAt",
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        field: "DeletedAt",
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AuditLogs");
  },
};
