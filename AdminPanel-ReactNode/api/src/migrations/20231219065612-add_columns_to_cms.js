'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('CMSManagements', 'CreatedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('CMSManagements', 'UpdatedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CMSManagements', 'CreatedBy');
    await queryInterface.removeColumn('CMSManagements', 'UpdatedBy');
  }
};
