"use strict";
const { encrypt } = require("../helpers/bcrypt");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Alfonso Sirait",
          email: "admin_pbl@gmail.com",
          password: encrypt("PBLJaya@1"),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
