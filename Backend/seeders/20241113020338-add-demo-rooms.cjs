'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rooms = [];
    for (let i = 1; i <= 150; i++) {
      rooms.push({
        room_name: `${i}-ABC`,
        head_resident_id: null,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
    await queryInterface.bulkInsert('rooms', rooms, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
