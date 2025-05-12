'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuoteItem extends Model {

    static associate(models) {
      QuoteItem.belongsTo(models.Quote, { foreignKey: 'quoteId',  as: 'quote' });
      QuoteItem.belongsTo(models.Product, { foreignKey: 'productId',  as: 'product' });
      QuoteItem.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' })
    }
  }
  QuoteItem.init({
    quoteId: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    unit_price: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    total_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'QuoteItem',
  });
  return QuoteItem;
};