'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
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
        // references: {
        //   model: 'Rooms',
        //   key: 'id'
        // }
      },
      bill_name: {
        type: Sequelize.STRING,
        allowNull: false,
        // preferences: {
        //   model: 'Fees',
        //   key: 'name'
        // }
      },
      deadline: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cost: {
        type: Sequelize.FLOAT,
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