'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {

    static associate(models) {
      Quote.belongsTo(models.Opportunity, { foreignKey: 'opportunityId' });
      Quote.belongsTo(models.Opportunity, { foreignKey: 'opportunityId', as: 'oppotunity' })
      Quote.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' })
      Quote.hasMany(models.QuoteItem, { foreignKey: 'quoteId' });
    }
  }
  Quote.init({
    opportunityId: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    status: DataTypes.STRING,
    valid_until: DataTypes.DATE,
    subtotal: DataTypes.DECIMAL,
    tax: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Quote',
  });
  return Quote;
};