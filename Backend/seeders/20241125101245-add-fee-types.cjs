'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up (queryInterface, Sequelize) {
    const feeTypes = [];
    for (const name of ['Tiền điện', 'Tiền nước', 'Tiền internet', 'Tiền phụ thu', 'Tiền dịch vụ']) {
      feeTypes.push({
        name,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('fee_types', feeTypes, {});
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fee_types', null, {});
  }
};
