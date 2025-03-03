'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: models.RolePermission, as: 'roles',
        foreignKey: 'permissionId',
      });
    }
  }
  Permission.init({
    id: {
      field: 'Id',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      field: 'Name',
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Permission',
    paranoid: true,
    timestamps: true,
  });
  return Permission;
};