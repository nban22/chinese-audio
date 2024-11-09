"use strict";
import { faker } from "@faker-js/faker";
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
        const albumsToUpdate = [];

        // Giả sử bạn muốn cập nhật avatar cho tất cả các album (hoặc có thể lọc theo ID hoặc điều kiện khác)
        for (let i = 1; i < 21; i++) {
            albumsToUpdate.push({
                avatar: faker.image.dataUri({ type: "svg-base64", width: 200, height: 200 }), // Tạo ảnh base64 mới
                id: i
            });
        }

        // Sử dụng queryInterface để cập nhật avatar
        for (const album of albumsToUpdate) {
          await queryInterface.bulkUpdate(
              'Album', // Tên bảng cần cập nhật
              { avatar: album.avatar }, // Cập nhật trường avatar
              { id: album.id } // Điều kiện để cập nhật theo id
          );
      }
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
