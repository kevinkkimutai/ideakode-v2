'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {

    static associate(models) {
      Ticket.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Ticket.belongsTo(models.Contact, { foreignKey: 'contactId' });
      Ticket.belongsTo(models.User, { foreignKey: 'assigned_to', as: 'assigned_to_user' });
      Ticket.belongsTo(models.TicketCategory, { foreignKey: 'categoryId' });
      Ticket.hasMany(models.TicketComment, { foreignKey: 'ticketId' });
      Ticket.hasMany(models.TicketAttachment, { foreignKey: 'ticketId' });
    }
  }
  Ticket.init({
    customerId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER,
    assigned_to: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    resolved_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};