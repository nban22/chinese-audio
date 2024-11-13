'use strict';
import { QueryInterface, DataTypes } from 'sequelize';
import { Album_AudioAttributes } from '../models/album_audio';
import { faker } from '@faker-js/faker';

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
   let data = [] as Album_AudioAttributes[];
   for (let i = 0; i < 300; i++) {
    data.push({
      albumId: faker.number.int({min: 1, max: 20}),
      audioId: faker.number.int({min: 104, max: 203}),
    })
   }

   let data2 = data.map(item => JSON.stringify(item))
   
   console.log(data2.length);
   
   data2 = [...new Set(data2)]
   console.log(data2.length);
   const data3 = data2.map(item => JSON.parse(item))
   
   
   await queryInterface.bulkInsert('Album_Audio', data3);   
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Album_Audio', {}, {});
  }
};
