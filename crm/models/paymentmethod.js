'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {

    static associate(models) {
      // define association here
    }
  }
  PaymentMethod.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN,
    account_details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};