'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {

    static associate(models) {
      InvoiceItem.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });
      InvoiceItem.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  InvoiceItem.init({
    invoiceId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    unit_price: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    tax_rate: DataTypes.DECIMAL,
    total_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'InvoiceItem',
  });
  return InvoiceItem;
};