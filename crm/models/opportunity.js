'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Opportunity extends Model {

    static associate(models) {
      Opportunity.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Opportunity.belongsTo(models.Contact, { foreignKey: 'contactId' });
      Opportunity.belongsTo(models.User, { foreignKey: 'assigned_to', as: 'assignee' })
      Opportunity.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' })
      Opportunity.belongsTo(models.Stage, { foreignKey: 'stageId' });
      Opportunity.hasMany(models.Quote, { foreignKey: 'opportunityId' });
    }
  }
  Opportunity.init({
    customerId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER,
    assigned_to: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    closed: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    value: DataTypes.DECIMAL,
    stageId: DataTypes.INTEGER,
    probability: DataTypes.DECIMAL,
    expected_close_date: DataTypes.DATE,
    lost_reason: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Opportunity',
  });
  return Opportunity;
};