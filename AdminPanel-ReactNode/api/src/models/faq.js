'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FAQ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FAQ.init({
    question: {
      field: "Question",
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    answer: {
      field: "Answer",
      type: DataTypes.TEXT("long"),
    },
    displayOrder: {
      field: "DisplayOrder",
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    status: {
      field: "Status",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Active"
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
    modelName: 'FAQ',
    paranoid: true,
    timestamps: true
  });
  return FAQ;
};