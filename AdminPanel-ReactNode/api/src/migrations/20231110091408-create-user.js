'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        field: "Id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        field: "FirstName",
        type: Sequelize.STRING
      },
      lastName: {
        field: "LastName",
        type: Sequelize.STRING
      },
      email: {
        field: "Email",
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        field: "Password",
        type: Sequelize.STRING,
        allowNull: false
      },
      profileImage: {
        field: "ProfileImage",
        type: Sequelize.STRING
      },
      status: {
        field: 'Status',
        type: Sequelize.STRING,
        defaultValue: 'Active'
      },
      roleId: {
        field: "RoleId",
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Roles', // The target table
          key: 'id',      // The target column
        },
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
    await queryInterface.dropTable('Users');
  }
};