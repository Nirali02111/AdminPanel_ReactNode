'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, { foreignKey: 'roleId', as: 'roles', targetKey: "id" });
      this.belongsTo(models.Permission, { foreignKey: 'permissionId', as: 'permissions', targetKey: 'id' });
    }

  }
  RolePermission.init({
    id: {
      field: "Id",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'RolePermission',
    paranoid: true,
    timestamps: true
  });
  return RolePermission;
};