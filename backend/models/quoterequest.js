'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuoteRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuoteRequest.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    service: DataTypes.STRING,
    budget: DataTypes.DECIMAL,
    timeline: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuoteRequest',
  });
  return QuoteRequest;
};