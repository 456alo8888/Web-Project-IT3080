'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {typeof import('sequelize')} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fees', {
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
      is_optional: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      created_by_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'admins',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      deadline: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      house_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      paid_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
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

    await queryInterface.createTable('fees_optional', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'fees',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      lower_bound: {
        allowNull: false,
        type: Sequelize.INTEGER,
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

    await queryInterface.createTable('fees_non_optional', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'fees',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'fee_types',
          key: 'id'
        },
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('fees_optional');
    await queryInterface.dropTable('fees_non_optional');
    await queryInterface.dropTable('fees');
  }
};