'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsToMany(models.User, {
        through: 'TaskAssignee',
        foreignKey: 'taskId',
        otherKey: 'userId',
        as: 'Assignees'
      });      

      Task.belongsTo(models.Project, {
        foreignKey: 'taskableId',
        constraints: false,
        as: 'Project'
      });
      
      Task.belongsTo(models.Product, {
        foreignKey: 'taskableId',
        constraints: false,
        as: 'Product'
      });
      
      Task.belongsTo(models.User, { foreignKey: 'assigned_by', as: 'Assigner' });
    }
  }

  Task.init({
    taskableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taskableType: {
      type: DataTypes.STRING, // 'Project' or 'Product'
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
    modelName: 'Task',
  });

  return Task;
};
