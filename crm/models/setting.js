'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {

    static associate(models) {
      // define association here
    }
  }
  Setting.init({
    setting_key: DataTypes.STRING,
    setting_value: DataTypes.TEXT,
    description: DataTypes.TEXT,
    is_public: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Setting',
  });
  return Setting;
};