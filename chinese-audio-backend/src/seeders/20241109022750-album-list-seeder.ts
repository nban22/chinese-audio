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
   const albumLists = []
   for (let i = 0; i < 10; i++) {
    albumLists.push({
      title: faker.music.songName(),
    })
   }
   await queryInterface.bulkInsert('AlbumList', albumLists)
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
