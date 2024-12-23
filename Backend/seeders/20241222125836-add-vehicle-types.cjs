'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up(queryInterface, Sequelize) {
    const vehicleTypes = [];
    for (const name of ['Ô tô', 'Xe máy', 'Xe đạp', 'Xe máy điện', 'Mô tô']) {
      vehicleTypes.push({
        name,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('vehicle_types', vehicleTypes, {});
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicle_types', null, {});
  }
};
