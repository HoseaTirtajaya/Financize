'use strict';
const sequelize = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('financial_expenses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: sequelize.fn("uuid_generate_v4"),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      budget_id: {
        type: sequelize.UUID,
        allowNull: false,
        references: {
          model: 'financial_data',
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
    await queryInterface.dropTable('financial_expenses');
  }
};