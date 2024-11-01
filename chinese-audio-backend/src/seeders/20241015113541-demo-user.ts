"use strict";

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert("user", [
            {
                name: "John Doe",
                username: "johndoe",
                password: "password",
            },
            {
                name: "Jane Doe",
                username: "janedoe",
                password: "password",
            },
            {
                name: "Jim Doe",
                username: "jimdoe",
                password: "password",
            },
            {
                name: "Jen Doe",
                username: "jendoe",
                password: "password ",
            },
        ]);
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete('user', {}, {});
    },
};
