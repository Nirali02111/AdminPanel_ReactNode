'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('FAQs', 'CreatedBy', {
     // field:'CreatedBy',
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('FAQs', 'UpdatedBy', {
     // field:'UpdatededBy',
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('FAQs', 'CreatedBy');
    await queryInterface.removeColumn('FAQs', 'UpdatedBy');
  }
};
