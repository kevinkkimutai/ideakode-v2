'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectTask extends Model {

    static associate(models) {
      ProjectTask.belongsTo(models.Project, { foreignKey: 'projectId' });
      ProjectTask.belongsTo(models.User, { foreignKey: 'assigned_to' });
    }
  }
  ProjectTask.init({
    projectId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    assigned_to: DataTypes.INTEGER,
    due_date: DataTypes.DATE,
    completed_at: DataTypes.DATE,
    estimated_hours: DataTypes.DECIMAL,
    actual_hours: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ProjectTask',
  });
  return ProjectTask;
};