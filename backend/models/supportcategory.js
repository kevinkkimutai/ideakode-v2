'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupportCategory extends Model {

    static associate(models) {
      SupportCategory.hasMany(models.SupportTicket, { foreignKey: 'supportId', as: 'supportticket' });
    
    }
  }
  SupportCategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'SupportCategory',
  });
  return SupportCategory;
};