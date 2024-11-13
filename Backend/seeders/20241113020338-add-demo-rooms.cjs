'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rooms = [];
    for (let i = 1; i <= 150; i++) {
      rooms.push({
        room_number: i,
        head_resident_id: 0, // You can set this to a valid resident ID or leave it null
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
