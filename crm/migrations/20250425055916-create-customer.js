'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      tax_id: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};