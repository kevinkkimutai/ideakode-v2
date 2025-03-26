'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupportTicket extends Model {

    static associate(models) {
      // define association here
      SupportTicket.belongsTo(models.SupportCategory, { foreignKey: 'supportId', as: 'supportcategory' });
    }
  }
  SupportTicket.init({
    subject: DataTypes.STRING,
    description: DataTypes.TEXT,
    supportId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    fullname: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SupportTicket',
  });
  return SupportTicket;
};