'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, { foreignKey: 'roleId', as: 'user', sourceKey: "id" });
      this.belongsToMany(models.Permission, {
        through: models.RolePermission,
        as: "permissions",
        foreignKey: "roleId",
      });
    }

    async setPermissions(permissionIds) {
      const role = this;
      const currentPermissions = await role.getPermissions();
      //permissions to remove (if any)
      const permissionsToRemove = currentPermissions?.filter(permission => !permissionIds.includes(permission.id));
      //permissions to add (if any)
      const permissionsToAdd = permissionIds?.filter(permissionId => !currentPermissions.some(permission => permission.id === permissionId));

      // Remove permissions
      if (permissionsToRemove.length > 0) {
        await role.removePermissions(permissionsToRemove);
      }
      // Add permissions
      if (permissionsToAdd.length > 0) {
        await role.addPermissions(permissionsToAdd);
      }
    }

  }
  Role.init({
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
    shortDescription: {
      field: 'ShortDescription',
      type: DataTypes.STRING
    },
    status: {
      field: "Status",
      type: DataTypes.STRING,
      defaultValue: 'Acitve',
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
    modelName: 'Role',
    paranoid: true,
    timestamps: true
  });

  return Role;
};