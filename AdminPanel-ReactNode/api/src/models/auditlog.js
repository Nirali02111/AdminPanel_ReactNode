"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "CreatedBy",
        as: "user",
        targetKey: "id",
      });
    }
  }
  AuditLog.init(
    {
      username: {
        field: "UserName",
        type: DataTypes.STRING,
      },
      actionType: {
        field: "ActionType",
        type: DataTypes.STRING,
      },
      activity: {
        field: "Activity",
        type: DataTypes.STRING,
      },
      timestamp: {
        field: "Timestamp",
        type: DataTypes.DATE,
      },
      details: {
        field: "Details",
        type: DataTypes.TEXT("long"),
        get() {
          const rawValue = this.getDataValue("details");
          return rawValue ? JSON.parse(rawValue) : null;
        },
      },
      CreatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "AuditLog",
      paranoid: true,
      timestamps: true,
    }
  );

  return AuditLog;
};
