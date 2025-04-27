'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketAttachment extends Model {

    static associate(models) {
    TicketAttachment.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
    TicketAttachment.belongsTo(models.TicketComment, { foreignKey: 'commentId' });
    TicketAttachment.belongsTo(models.User, { foreignKey: 'uploaded_by' });
    }
  }
  TicketAttachment.init({
    ticketId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    file_name: DataTypes.STRING,
    file_path: DataTypes.STRING,
    file_size: DataTypes.INTEGER,
    mime_type: DataTypes.STRING,
    uploaded_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TicketAttachment',
  });
  return TicketAttachment;
};