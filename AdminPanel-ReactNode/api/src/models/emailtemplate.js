'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmailTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmailTemplate.init({
    key: {
      field: "Key",
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      field: "Title",
      type: DataTypes.STRING
    },
    fromEmail: {
      field: "FromEmail",
      type: DataTypes.STRING
    },
    fromName: {
      field: "FromName",
      type: DataTypes.STRING
    },
    subject: {
      field: "Subject",
      type: DataTypes.STRING
    },
    body: {
      field: "Body",
      type: DataTypes.TEXT("long")
    },
    isManualMail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isContactUsMail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'EmailTemplate',
    paranoid: true,
    timestamps: true
  });
  return EmailTemplate;
};