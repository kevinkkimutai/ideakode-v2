'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {

    static associate(models) {
      ProductCategory.hasMany(models.Product, { foreignKey: 'categoryId' });
      ProductCategory.belongsTo(models.ProductCategory, { 
        as: 'ParentCategory', 
        foreignKey: 'parent_categoryId' 
      });
      ProductCategory.hasMany(models.ProductCategory, { 
        as: 'SubCategories', 
        foreignKey: 'parent_categoryId' 
      });
    }
  }
  ProductCategory.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    parent_categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};