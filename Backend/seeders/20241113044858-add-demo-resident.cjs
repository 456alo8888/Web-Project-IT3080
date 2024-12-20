const { fakerVI: faker } = require('@faker-js/faker');

module.exports = {

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  up: async (queryInterface, Sequelize) => {
    const residents = [];

    // Now, create residents and assign them to rooms
    const roomIds = await queryInterface.sequelize.query('SELECT id FROM rooms');
    const roomIdsList = roomIds[0]; // Extract room ids from the query result

    for (let i = 0; i < 200; i++) {
      const roomId = faker.helpers.arrayElement(roomIdsList).id;
      const gender = faker.helpers.arrayElement(['male', 'female', 'other']);
      const sex = gender === 'other' ? undefined : gender;
      const fullName = `${faker.person.lastName(sex)} ${faker.person.firstName(sex)}`
      residents.push({
        name: fullName,
        age: faker.number.int({ min: 18, max: 80 }),
        gender,
        phone_number: faker.phone.number({ style: 'national' }),
        id_card_number: faker.string.numeric(12),
        room_id: roomId, // Assign room to the resident
        image: faker.image.avatar(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // Insert residents into the 'residents' table
    await queryInterface.bulkInsert('residents', residents, {});
    let residents_with_id = (await queryInterface.sequelize.query('SELECT * FROM residents'))[0];
    // Assign a head resident to each room
    const roomResidentPairs = [];
    for (const room of roomIdsList) {
      const allMembers = residents_with_id.filter(resi => resi.room_id === room.id);
      if (allMembers.length === 0)
          continue;
      const headResident = faker.helpers.arrayElement(allMembers);
      roomResidentPairs.push({
        room_id: room.id,
        head_resident_id: headResident.id, // Set head resident
      });
    }
    // Update the rooms with head resident references
    for (const pair of roomResidentPairs) {
      await queryInterface.bulkUpdate(
        'rooms', 
        { head_resident_id: pair.head_resident_id }, 
        { id: pair.room_id });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all residents and rooms in reverse order (to prevent foreign key issues)
    await queryInterface.bulkDelete('residents', null, {});
    await queryInterface.bulkDelete('rooms', null, {});
  },
};
