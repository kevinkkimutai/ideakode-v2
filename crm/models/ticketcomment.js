'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketComment extends Model {

    static associate(models) {
      TicketComment.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
      TicketComment.belongsTo(models.User, { foreignKey: 'userId' });
      TicketComment.hasMany(models.TicketAttachment, { foreignKey: 'commentId' });
    }
  }
  TicketComment.init({
    ticketId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    is_internal_note: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TicketComment',
  });
  return TicketComment;
};