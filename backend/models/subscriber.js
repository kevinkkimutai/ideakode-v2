'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriber extends Model {

    static associate(models) {
      // define association here
    }
  }
  Subscriber.init({
    email: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscriber',
  });
  return Subscriber;
};