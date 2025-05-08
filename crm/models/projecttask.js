'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectTask extends Model {
    static associate(models) {
      ProjectTask.belongsTo(models.Project, { foreignKey: 'projectId' });
      ProjectTask.belongsToMany(models.User, {
        through: 'ProjectTaskAssignee',
        foreignKey: 'projectTaskId',
        otherKey: 'userId',
        as: 'Assignees'
      });      
      ProjectTask.belongsTo(models.User, { foreignKey: 'assigned_by', as: 'Assigner' });
    }
  }

  ProjectTask.init({
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    assigned_by: DataTypes.INTEGER,
    due_date: DataTypes.DATEONLY, 
    completed_at: DataTypes.DATEONLY,
    estimated_hours: DataTypes.DECIMAL,
    actual_hours: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ProjectTask',
  });

  return ProjectTask;
};
