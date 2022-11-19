"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Laporans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      nama_kelompok: {
        type: Sequelize.STRING,
      },
      nama_ketua: {
        type: Sequelize.STRING,
      },
      nama_manpro: {
        type: Sequelize.STRING,
      },
      laporan: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Laporans");
  },
};
