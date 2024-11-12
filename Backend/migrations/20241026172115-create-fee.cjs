'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      fee_type: {
        type: Sequelize.STRING,
        allowNull: false,
        enum:['BAT BUOC', 'TU NGUYEN' , 'HOA DON']
      },
      created_by_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Admins',
        //   key: 'id'
        // }
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      house_count: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Fees');
  }
};