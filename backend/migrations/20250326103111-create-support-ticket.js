'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SupportTickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      supportId: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('SupportTickets');
  }
};