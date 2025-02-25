'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmailTemplates', {
      id: {
        field: "Id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        field: "Key",
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        field: "Title",
        type: Sequelize.STRING
      },
      fromEmail: {
        field: "FromEmail",
        type: Sequelize.STRING
      },
      fromName: {
        field: "FromName",
        type: Sequelize.STRING
      },
      subject: {
        field: "Subject",
        type: Sequelize.STRING
      },
      body: {
        field: "Body",
        type: Sequelize.TEXT("long")
      },
      isManualMail: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isContactUsMail: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      status: {
        field: "Status",
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Active"
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
      deletedAt: {
        field: "DeletedAt",
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EmailTemplates');
  }
};