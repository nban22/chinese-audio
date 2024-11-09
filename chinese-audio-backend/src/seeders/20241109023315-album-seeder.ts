'use strict';
import { fakerVI as faker } from '@faker-js/faker';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const albums = []
    for (let i = 0; i < 20; i++) {
      albums.push({
        title: faker.music.album(),
        description: faker.lorem.sentence({min: 5, max: 20}),
        releaseDate: new Date(),
        isPublic: !!faker.number.int({min: 0, max: 1}),
        avatar: faker.image.dataUri({type: 'svg-base64', width: 200, height: 200})
      })
    }
    await queryInterface.bulkInsert('Album', albums)
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
