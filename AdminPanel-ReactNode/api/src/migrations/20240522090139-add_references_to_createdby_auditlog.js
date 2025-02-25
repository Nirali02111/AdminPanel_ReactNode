"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("AuditLogs", {
      fields: ["CreatedBy"],
      type: "foreign key",
      name: "fk_auditlogs_createdby", // optional: specify the constraint name
      references: {
        table: "Users",
        field: "id",
      },
      //  onUpdate: "CASCADE",
      //  onDelete: "SET NULL", // or 'CASCADE' or 'RESTRICT' depending on your requirement
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "AuditLogs",
      "fk_auditlogs_createdby"
    );
  },
};
