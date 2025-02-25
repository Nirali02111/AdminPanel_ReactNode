'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermissions', {
      id: {
        field: "Id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      permissionId: {
        field: "PermissionId",
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Permissions', // The target table
          key: 'id',      // The target column
        },
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
    await queryInterface.dropTable('RolePermissions');
  }
};