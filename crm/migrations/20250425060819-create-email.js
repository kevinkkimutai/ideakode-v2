'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Emails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      thread_id: {
        type: Sequelize.STRING
      },
      from_address: {
        type: Sequelize.STRING
      },
      to_addresses: {
        type: Sequelize.TEXT
      },
      cc_addresses: {
        type: Sequelize.TEXT
      },
      bcc_addresses: {
        type: Sequelize.TEXT
      },
      subject: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.TEXT
      },
      sent_at: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      related_to: {
        type: Sequelize.STRING
      },
      related_id: {
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
    await queryInterface.dropTable('Emails');
  }
};