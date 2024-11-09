"use strict";
import { QueryInterface, DataTypes } from "sequelize";
import { AlbumAttributes } from "../models/album";
import {fakerVI as faker} from "@faker-js/faker";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const albums: AlbumAttributes[] = [];

        for (let i = 0; i < 20; i++) {
            albums.push({
              title: faker.music.album(),
              description: faker.lorem.sentence({min: 10, max: 20}),
              releaseDate: faker.date.past(),
              isPublic: !!faker.number.int({min: 0, max: 1}),
              avatar: faker.image.dataUri({type: "svg-base64", width: 200, height: 200})
            })
        }

        await queryInterface.bulkInsert("Album", albums,)
    },

    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
