'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FAQs', {
      id: {
        field: 'Id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        field: "Question",
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      answer: {
        field: "Answer",
        type: Sequelize.TEXT("long"),
      },
      displayOrder: {
        field: "DisplayOrder",
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
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
    await queryInterface.dropTable('FAQs');
  }
};