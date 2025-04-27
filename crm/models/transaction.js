'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {

    static associate(models) {
      Transaction.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });
      Transaction.belongsTo(models.User, { foreignKey: 'recorded_by' });
    }
  }
  Transaction.init({
    invoiceId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    payment_method: DataTypes.STRING,
    transaction_date: DataTypes.DATE,
    reference: DataTypes.STRING,
    status: DataTypes.STRING,
    notes: DataTypes.TEXT,
    recorded_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};