"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Laporan.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Laporan.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Title tidak boleh kosong",
          },
        },
      },
      nama_kelompok: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama Kelompok tidak boleh kosong",
          },
        },
      },
      nama_ketua: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama Ketua tidak boleh kosong",
          },
        },
      },
      nama_manpro: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nama Manpro tidak boleh kosong",
          },
        },
      },
      laporan: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Laporan",
    }
  );
  return Laporan;
};
