const { fakerVI: faker } = require('@faker-js/faker');

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  up: async (queryInterface, Sequelize) => {
    const vehicles = [];

    // Fetch all room IDs
    const roomIds = await queryInterface.sequelize.query('SELECT id FROM rooms');
    const roomIdsList = roomIds[0]; // Extract room IDs from the query result

    // Fetch all vehicle type IDs
    const vehicleTypeIds = await queryInterface.sequelize.query('SELECT id FROM vehicle_types');
    const vehicleTypeIdsList = vehicleTypeIds[0]; // Extract vehicle type IDs from the query result

    // Create 200 vehicles and assign them to rooms and vehicle types
    for (let i = 0; i < 200; i++) {
      const roomId = faker.helpers.arrayElement(roomIdsList).id;
      const type = faker.helpers.arrayElement(vehicleTypeIdsList).id;
      vehicles.push({
        room_id: roomId,
        type_id: type,
        license_plate: faker.vehicle.vin().toUpperCase().slice(0, 10),
        image: faker.image.urlLoremFlickr({ category: 'vehicles' }),
        insurance_end_date: faker.date.future(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Insert vehicles into the 'vehicles' table
    await queryInterface.bulkInsert('vehicles', vehicles, {});
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  down: async (queryInterface, Sequelize) => {
    // Delete all vehicles
    await queryInterface.bulkDelete('vehicles', null, {});
  },
};
