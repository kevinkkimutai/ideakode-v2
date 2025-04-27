'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {

    static associate(models) {
      Project.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Project.belongsTo(models.User, { foreignKey: 'managerId' });
      Project.hasMany(models.ProjectTask, { foreignKey: 'projectId' });
    }
  }
  Project.init({
    customerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    budget: DataTypes.DECIMAL,
    managerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};