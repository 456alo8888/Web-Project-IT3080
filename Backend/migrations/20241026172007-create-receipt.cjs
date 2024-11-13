'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('receipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Admins',
        //   key: 'id'
        // }
      },
      resident_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Residents',
        //   key: 'id'
        // }
      },
      money_amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      bill_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Bills',
        //   key: 'id'
        // }
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
    await queryInterface.dropTable('receipts');
  }
};