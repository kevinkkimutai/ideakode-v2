'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER
      },
      quoteId: {
        type: Sequelize.INTEGER
      },
      issued_by: {
        type: Sequelize.INTEGER
      },
      invoice_number: {
        type: Sequelize.STRING
      },
      issue_date: {
        type: Sequelize.DATE
      },
      due_date: {
        type: Sequelize.DATEONLY
      },
      sent_at: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      subtotal: {
        type: Sequelize.DECIMAL
      },
      tax: {
        type: Sequelize.DECIMAL
      },
      discount: {
        type: Sequelize.DECIMAL
      },
      total: {
        type: Sequelize.DECIMAL
      },
      notes: {
        type: Sequelize.TEXT
      },
      terms: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Invoices');
  }
};