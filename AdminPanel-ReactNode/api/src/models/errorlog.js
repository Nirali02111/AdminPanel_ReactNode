'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ErrorLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ErrorLog.init({
    log: {
      field: "Log",
      type: DataTypes.TEXT("long"),
      get() {
        const rawValue = this.getDataValue('log');
        return rawValue ? JSON.parse(rawValue) : null;
      }
    },
    timestamp: {
      field: "Timestamp",
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'ErrorLog',
  });
  return ErrorLog;
};