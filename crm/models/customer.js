'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {

    static associate(models) {
    Customer.hasMany(models.Contact, { foreignKey: 'customerId' });
    Customer.hasMany(models.Address, { foreignKey: 'customerId' });
    Customer.hasMany(models.Opportunity, { foreignKey: 'customerId' });
    Customer.hasMany(models.Project, { foreignKey: 'customerId' });
    Customer.hasMany(models.Ticket, { foreignKey: 'customerId' });
    Customer.belongsTo(models.User, { foreignKey: 'created_by' });
    }
  }
  Customer.init({
    company_name: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    industry: DataTypes.STRING,
    website: DataTypes.STRING,
    tax_id: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};