"use strict";
import { fakerEN as faker } from "@faker-js/faker";
import { QueryInterface, DataTypes } from "sequelize";

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
        const audios = [];
        for (let i = 0; i < 100; i++) {
            audios.push({
                title: faker.music.songName(),
                description: faker.lorem.sentence(),
                file: null,
                playCount: faker.number.int({ min: 0, max: 1000 }),

                likeCount: faker.number.int({ min: 0, max: 1000 }),
                isPublic: faker.number.int({ min: 0, max: 1 }) === 1,
                duration: faker.number.int({ min: 0, max: 1000 }),
                fileName: faker.system.fileName({ extensionCount: 0 }) + ".mp3",
            });
        }
        await queryInterface.bulkInsert("Audio", audios, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Audio', {}, {});
    },
};
