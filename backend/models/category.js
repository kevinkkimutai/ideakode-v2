'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      // define association here
      Category.hasMany(models.Project, { foreignKey: 'categoryId', as: 'project' });
    }
  }
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};