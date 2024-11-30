'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {typeof import('sequelize')} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('residents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      id_card_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rooms',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'RESTRICT'
      },
      image: {
        type: Sequelize.STRING(2083),
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
    await queryInterface.addColumn('rooms', 'head_resident_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'residents',
        key: 'id'
      },
      allowNull: true,
      onDelete: 'SET NULL'
    })
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('rooms', 'head_resident_id');
    await queryInterface.dropTable('residents');
  }
};