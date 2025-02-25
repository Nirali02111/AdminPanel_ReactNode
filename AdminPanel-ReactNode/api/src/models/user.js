'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role', targetKey: "id" });
    }
  }
  User.init({
    firstName: {
      field: "FirstName",
      type: DataTypes.STRING
    },
    lastName: {
      field: "LastName",
      type: DataTypes.STRING
    },
    email: {
      field: "Email",
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      field: "Password",
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImage: {
      field: "ProfileImage",
      type: DataTypes.STRING
    },
    status: {
      field: 'Status',
      type: DataTypes.STRING,
      defaultValue: 'Active'
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
    modelName: 'User',
    paranoid: true,
    timestamps: true,
  });
  return User;
};