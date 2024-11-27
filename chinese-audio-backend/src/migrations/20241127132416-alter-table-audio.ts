'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Audio', 'size', {
      type: DataTypes.INTEGER,
    });
    await queryInterface.addColumn('Audio', 'url', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('Audio', 'originalFileName', {
      type: DataTypes.STRING,
    });

  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
