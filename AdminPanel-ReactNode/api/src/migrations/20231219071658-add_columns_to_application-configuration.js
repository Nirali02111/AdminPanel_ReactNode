'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ApplicationConfigurations', 'CreatedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('ApplicationConfigurations', 'UpdatedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ApplicationConfigurations', 'CreatedBy');
    await queryInterface.removeColumn('ApplicationConfigurations', 'UpdatedBy');
  }
};
