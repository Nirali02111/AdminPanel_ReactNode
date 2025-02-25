'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CMSManagements', {
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
      metaTitle: {
        field: 'MetaTitle',
        type: Sequelize.STRING
      },
      metaKeyword: {
        field: 'MetaKeyword',
        type: Sequelize.STRING
      },
      metaDescription: {
        field: 'MetaDescription',
        type: Sequelize.STRING
      },
      content: {
        field: 'Content',
        type: Sequelize.TEXT("long")
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
    await queryInterface.dropTable('CMSManagements');
  }
};