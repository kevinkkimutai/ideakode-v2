'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApiKey extends Model {

    static associate(models) {
      ApiKey.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  ApiKey.init({
    userId: DataTypes.INTEGER,
    api_key: DataTypes.STRING,
    secret: DataTypes.STRING,
    permissions: DataTypes.TEXT,
    expires_at: DataTypes.DATE,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ApiKey',
  });
  return ApiKey;
};