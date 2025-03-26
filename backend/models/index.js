'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');  // Directly use Sequelize from the package
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // Keeping this for possible future environment-based configurations
const db = {};

// Use the connection string directly from the environment variable
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable query logging for a cleaner output
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate models if applicable
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
