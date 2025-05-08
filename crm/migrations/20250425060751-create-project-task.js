'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProjectTasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      assigned_by: {
        type: Sequelize.INTEGER
      },
      due_date: {
        type: Sequelize.DATEONLY
      },
      completed_at: {
        type: Sequelize.DATEONLY
      },
      estimated_hours: {
        type: Sequelize.DECIMAL
      },
      actual_hours: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('ProjectTasks');
  }
};