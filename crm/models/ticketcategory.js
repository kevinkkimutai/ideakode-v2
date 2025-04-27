'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketCategory extends Model {

    static associate(models) {
      TicketCategory.hasMany(models.Ticket, { foreignKey: 'categoryId' });
    }
  }
  TicketCategory.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TicketCategory',
  });
  return TicketCategory;
};