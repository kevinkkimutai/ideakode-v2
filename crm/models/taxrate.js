'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaxRate extends Model {

    static associate(models) {
      // define association here
    }
  }
  TaxRate.init({
    name: DataTypes.STRING,
    rate: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TaxRate',
  });
  return TaxRate;
};