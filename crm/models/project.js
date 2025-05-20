'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Customer Association
      Project.belongsTo(models.Customer, { 
        foreignKey: 'customerId',
        as: 'Customer' 
      });

      // Manager (User) Association
      Project.belongsTo(models.User, { 
        foreignKey: 'managerId',
        as: 'Manager'  
      });

      // Project Tasks Association
      Project.hasMany(models.Task, {
        foreignKey: 'taskableId',
        constraints: false,
        scope: {
          taskableType: 'Project'
        },
        as: 'Tasks'
      });
      
    }
  }
  Project.init({
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    budget: DataTypes.DECIMAL,
    repo_link: DataTypes.STRING,
    stagging_link: DataTypes.STRING,
    live_link: DataTypes.STRING,
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};