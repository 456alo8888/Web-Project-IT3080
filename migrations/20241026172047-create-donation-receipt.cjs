'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donation_receipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resident_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Residents',
        //   key: 'id'
        // }
      },
      fee_name: {
        type: Sequelize.STRING,
        // references: {
        //   model: 'Fees',
        //   key: 'name'
        // }
      },
      admin_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Admins',
        //   key: 'id'
        // }
      },
      money_amount: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    await queryInterface.dropTable('Donation_receipts');
  }
};