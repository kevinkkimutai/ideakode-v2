'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
 
    static associate(models) {
      AuditLog.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  AuditLog.init({
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    entity_type: DataTypes.STRING,
    entity_id: DataTypes.INTEGER,
    old_values: DataTypes.TEXT,
    new_values: DataTypes.TEXT,
    ip_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AuditLog',
  });
  return AuditLog;
};