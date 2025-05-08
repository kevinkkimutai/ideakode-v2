'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSubCategory extends Model {
 
    static associate(models) {
        ProductSubCategory.belongsTo(models.ProductCategory, {
          foreignKey: 'categoryId',
          as: 'ParentCategory'
        });
      
      
      
    }
  }
  ProductSubCategory.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductSubCategory',
  });
  
  return ProductSubCategory;
};