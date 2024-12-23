'use strict';

const { fakerVI: faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const roomTypes = (await queryInterface.sequelize.query('SELECT id FROM room_types'))[0];

    const rooms = [];
    for (let i = 1; i <= 40; i++) {
      rooms.push({
        room_name: `${i}`,
        head_resident_id: null,
        type_id: faker.helpers.arrayElement(roomTypes).id,
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
