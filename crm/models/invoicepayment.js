'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoicePayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InvoicePayment.belongsTo(models.Transaction, {
        foreignKey: 'transaction_id',
        as: 'transaction', // <-- must match
      });
    
      InvoicePayment.belongsTo(models.User, {
        foreignKey: 'recorded_by',
        as: 'recordedBy', // <-- must match
      });
    
      InvoicePayment.belongsTo(models.Invoice, {
        foreignKey: 'invoice_id',
        as: 'invoice',
      });
    }
    
    
  }
  InvoicePayment.init({
    invoice_id: DataTypes.INTEGER,
    transaction_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    payment_date: DataTypes.DATE,
    payment_method: DataTypes.STRING,
    notes: DataTypes.TEXT,
    recorded_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoicePayment',
  });
  return InvoicePayment;
};