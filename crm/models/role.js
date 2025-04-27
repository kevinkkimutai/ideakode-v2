'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'roleId' });
    }
  }
  Role.init({
    role_name: DataTypes.STRING,
    permissions: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};