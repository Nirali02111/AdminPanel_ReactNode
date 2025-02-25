'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CMS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CMS.init({
    key: {
      field: "Key",
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      field: 'Title',
      type: DataTypes.STRING
    },
    metaTitle: {
      field: "MetaTitle",
      type: DataTypes.STRING
    },
    metaKeyword: {
      field: "MetaKeyword",
      type: DataTypes.STRING
    },
    metaDescription: {
      field: "MetaDescription",
      type: DataTypes.STRING
    },
    content: {
      field: "Content",
      type: DataTypes.TEXT("long")
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
    modelName: 'CMSManagement',
    paranoid: true,
    timestamps: true
  });
  return CMS;
};