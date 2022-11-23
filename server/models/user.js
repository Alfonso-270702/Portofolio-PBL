"use strict";
const { encrypt } = require("../helpers/bcrypt");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    fullName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Fullname tidak boleh kosong",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Email tidak boleh kosong",
        },
        emailChecker(value) {
          if (!/\S+@\S+\.\S+/.test(value)) {
            throw new Error("Harap masukkan email yang benar");
          }
        },
      },
      unique: {
        msg: "Email sudah terdaftar",
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Password tidak boleh kosong",
        },
        passChecker(value) {
          if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
              value
            )
          ) {
            throw new Error(
              "Format password minimal 8 karakter, 1 huruf besar, 1 huruf kecil dan minimal 1 spesial karater"
            );
          }
        },
      },
    },
    role: { type: Sequelize.STRING },
  });
  User.beforeCreate(function (user) {
    user.password = encrypt(user.password);
    user.role = "user";
  });
  return User;
};

// ("use strict");
// const { Model } = require("sequelize");
// const { encrypt } = require("../helpers/bcrypt");
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       User.hasMany(models.Laporan, { foreignKey: "userId" });
//     }
//   }
//   User.init(
//     {
//       fullName: {
//         type: DataTypes.STRING,
//         validate: {
//           notEmpty: {
//             msg: "Fullname tidak boleh kosong",
//           },
//         },
//       },
//       email: {
//         type: DataTypes.STRING,
//         validate: {
//           notEmpty: {
//             msg: "Email tidak boleh kosong",
//           },
//           emailChecker(value) {
//             if (!/\S+@\S+\.\S+/.test(value)) {
//               throw new Error("Harap masukkan email yang benar");
//             }
//           },
//         },
//         unique: {
//           msg: "Email sudah terdaftar",
//         },
//       },
//       password: {
//         type: DataTypes.STRING,
//         validate: {
//           notEmpty: {
//             msg: "Password tidak boleh kosong",
//           },
//           passChecker(value) {
//             if (
//               !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
//                 value
//               )
//             ) {
//               throw new Error(
//                 "Format password minimal 8 karakter, 1 huruf besar, 1 huruf kecil dan minimal 1 spesial karater"
//               );
//             }
//           },
//         },
//       },
//       role: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "User",
//       hooks: {
//         beforeCreate: (user) => {
//           user.password = encrypt(user.password);
//           user.role = "user";
//         },
//       },
//     }
//   );
//   return User;
// };
