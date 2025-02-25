'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('EmailTemplates', 'CreatedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('EmailTemplates', 'UpdatedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('EmailTemplates', 'CreatedBy');
    await queryInterface.removeColumn('EmailTemplates', 'UpdatedBy');
  }
};
