'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {

    static associate(models) {
      Lead.belongsTo(models.User, { foreignKey: 'assigned_to' });
    }
  }
  Lead.init({
    sourceId: DataTypes.INTEGER,
    assigned_to: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    company_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lead',
  });
  return Lead;
};