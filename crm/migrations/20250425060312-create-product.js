'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      subCategoryId: {
        type: Sequelize.INTEGER
       },
      image: {
          type: Sequelize.STRING
        },
      stagging_link: {
          type: Sequelize.STRING
        },
      live_link: {
          type: Sequelize.STRING
        },
      repo_link: {
          type: Sequelize.STRING
        },
      status: {
          type: Sequelize.STRING
        },
      price: {
        type: Sequelize.DECIMAL
      },
      is_active: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Products');
  }
};