'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async up (queryInterface, Sequelize) {
    const feeTypes = [];
    for (const name of ['Tiền điện', 'Tiền thở', 'Phí dịch vụ', 'Tiền sinh hoạt chung', 'Phí VAT']) {
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
