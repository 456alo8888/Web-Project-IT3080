'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('Admins', [
      {
        username: 'ROOT',
        password: '12345678',
        update_fee_authority: true,
        update_resident_authority: true,
        create_fee_authority: true,
        receive_authority: true,
        is_root: true,
        first_name: 'ROOT',
        last_name: 'ROOT',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Admins', null, {});
  }
};
