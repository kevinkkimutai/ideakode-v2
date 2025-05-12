'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {

    static associate(models) {
    Invoice.belongsTo(models.Customer, { foreignKey: 'customerId' });
    Invoice.belongsTo(models.Quote, { foreignKey: 'quoteId' });
    Invoice.belongsTo(models.User, { foreignKey: 'issued_by', as: 'Issuer' });
    Invoice.hasMany(models.InvoiceItem, { foreignKey: 'invoiceId' });
    Invoice.hasMany(models.Transaction, { foreignKey: 'invoiceId' });
    }
  }
  Invoice.init({
    customerId: DataTypes.INTEGER,
    quoteId: DataTypes.INTEGER,
    issued_by: DataTypes.INTEGER,
    invoice_number: DataTypes.STRING,
    issue_date: DataTypes.DATE,
    due_date: DataTypes.DATEONLY,
    sent_at: DataTypes.DATE,
    status: DataTypes.STRING,
    subtotal: DataTypes.DECIMAL,
    tax: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    notes: DataTypes.TEXT,
    terms: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};