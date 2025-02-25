'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicationConfiguration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ApplicationConfiguration.init({
    key: {
      field: 'Key',
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    value: {
      field: 'Value',
      type: DataTypes.STRING,
    },
    CreatedBy: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
    UpdatedBy: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ApplicationConfiguration',
    paranoid: true,
    timestamps: true
  });
  return ApplicationConfiguration;
};