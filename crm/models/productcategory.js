'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {

    static associate(models) {
      ProductCategory.hasMany(models.Product, { foreignKey: 'categoryId' });
      ProductCategory.hasMany(models.ProductSubCategory, {
          foreignKey: 'categoryId',
          as: 'SubCategories'
        });
    }
  }
  ProductCategory.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};
