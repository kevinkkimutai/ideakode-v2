'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProjectTaskAssignees', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      projectTaskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ProjectTasks',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProjectTaskAssignees');
  }
};
