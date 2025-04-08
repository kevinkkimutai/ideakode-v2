require('dotenv').config();
const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

// For direct app usage
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  // logging: false, 
});
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully. 🎉🥂');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
// Export for Sequelize CLI usage
module.exports = {
  development: {
    dialect: 'postgres',
    url: databaseUrl, 
    dialectOptions: { ssl: { rejectUnauthorized: false } },
  },
  test: {
    dialect: 'postgres',
    url: databaseUrl, 
  },
  production: {
    dialect: 'postgres',
    url: databaseUrl, 

  },
};

module.exports.sequelize = sequelize; 
