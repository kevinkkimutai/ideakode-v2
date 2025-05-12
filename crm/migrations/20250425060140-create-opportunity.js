'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Opportunities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER
      },
      contactId: {
        type: Sequelize.INTEGER
      },
      assigned_to: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      value: {
        type: Sequelize.DECIMAL
      },
      probability: {
        type: Sequelize.DECIMAL
      },
      expected_close_date: {
        type: Sequelize.DATE
      },
      lost_reason: {
        type: Sequelize.STRING
      },
      stageId: {
        type: Sequelize.INTEGER
      },
      closed: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Opportunities');
  }
};