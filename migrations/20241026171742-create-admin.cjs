'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [8, 100]
        }
      },
      update_fee_authority: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false

      },
      update_resident_authority: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      create_fee_authority: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      receive_authority: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false

      },
      is_root: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Admins');
  }
};