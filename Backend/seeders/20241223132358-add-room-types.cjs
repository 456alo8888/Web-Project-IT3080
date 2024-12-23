'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up(queryInterface, Sequelize) {
    const vehicleTypes = [];
    const names = ['VIP-I', 'VIP-II', 'Cơ bản (lớn)', 'Cơ bản (trung)', '2K3N'];
    const areas = [100, 200, 150, 100, 120];
    if (names.length !== areas.length) {
      throw Error("Sizes must be the same");
    }
    for (let i = 0; i < names.length; ++i) {
      vehicleTypes.push({
        name: names[i],
        area: areas[i],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('room_types', vehicleTypes, {});
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('room_types', null, {});
  }
};
