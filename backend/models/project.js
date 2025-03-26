'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {

    static associate(models) {
      Project.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Project.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    }
  }
  Project.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {  
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    demolink : {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};