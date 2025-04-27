'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
      User.hasMany(models.Lead, { foreignKey: 'assigned_to' });
      User.hasMany(models.Opportunity, { foreignKey: 'assigned_to' });
      User.hasMany(models.Ticket, { foreignKey: 'assigned_to' });
      User.hasMany(models.Project, { foreignKey: 'managerId' });
      User.hasMany(models.Customer, { foreignKey: 'created_by' });
      User.hasMany(models.ProjectTask, { foreignKey: 'assigned_to' });
      User.hasMany(models.Email, { foreignKey: 'userId' });
      User.hasMany(models.Call, { foreignKey: 'made_by' });
      User.hasMany(models.Meeting, { foreignKey: 'organizerId' });
      User.belongsToMany(models.Meeting, { through: 'MeetingParticipants', foreignKey: 'userId' });
      User.hasMany(models.AuditLog, { foreignKey: 'userId' });
      User.hasMany(models.ApiKey, { foreignKey: 'userId' });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    last_login: DataTypes.DATE,
    roleId: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,
    verificationToken: DataTypes.STRING,
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};