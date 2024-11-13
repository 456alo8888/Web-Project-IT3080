const { faker } = require('@faker-js/faker');

module.exports = {
 up: async (queryInterface, Sequelize) => {
   const residents = [];
   
   for (let i = 0; i < 100; i++) {
     residents.push({
       first_name: faker.person.firstName(),
       middle_name: faker.person.firstName(),
       last_name: faker.person.lastName(),
       age: faker.number.int({ min: 18, max: 80 }),
       gender: faker.helpers.arrayElement(['male', 'female']),
       phone_number: faker.phone.number(),
       id_card_number: faker.string.alphanumeric(12),
       room_id: faker.number.int({ min: 1, max: 120 }),
       image: faker.image.avatar(),
       created_at: new Date(),
       updated_at: new Date(),
     });
   }

   await queryInterface.bulkInsert('residents', residents, {});
 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('residents', null, {});
 },
};