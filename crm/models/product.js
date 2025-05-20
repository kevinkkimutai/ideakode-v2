'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.belongsTo(models.ProductCategory, { foreignKey: 'categoryId', as: 'category' });
      Product.belongsTo(models.ProductSubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' });      
      Product.hasMany(models.QuoteItem, { foreignKey: 'productId' });
      Product.hasMany(models.Task, {
        foreignKey: 'taskableId',
        constraints: false,
        scope: {
          taskableType: 'Product'
        },
        as: 'Tasks'
      });
      Product.belongsTo(models.User, { 
        foreignKey: 'managerId',
        as: 'Manager'  
      });
      
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    stagging_link: DataTypes.STRING,
    live_link: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    repo_link: DataTypes.STRING,
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true 
    }
    
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};