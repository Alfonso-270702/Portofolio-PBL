"use strict";
module.exports = (sequelize, Sequelize) => {
  const Laporan = sequelize.define("laporan", {
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Title tidak boleh kosong",
        },
      },
    },
    nama_kelompok: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Nama Kelompok tidak boleh kosong",
        },
      },
    },
    nama_ketua: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Nama Ketua tidak boleh kosong",
        },
      },
    },
    nama_manpro: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Nama Manpro tidak boleh kosong",
        },
      },
    },
    laporan: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });
  return Laporan;
};
