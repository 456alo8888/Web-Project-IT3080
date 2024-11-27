'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {typeof import('sequelize')} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rooms',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      fee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'fees',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bills');
  }
};