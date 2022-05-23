'use strict';
const sequelize = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('financial_data', {
      id: {
        type: Sequelize.UUID,
        defaultValue: sequelize.fn("uuid_generate_v4"),
        allowNull: false,
        primaryKey: true
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      type: {
        type: Sequelize.STRING
      },
      user_id: {
        type: sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    await queryInterface.dropTable('financial_data');
  }
};