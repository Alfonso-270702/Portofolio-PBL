const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class HomeController {
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((data) => {
        if (!data) throw { msg: "User tidak ditemukan", status: 400 };
        else {
          const hashedPassword = compare(password, data.password);
          if (hashedPassword) {
            const token = createToken({
              id: data.id,
              email: data.email,
              role: data.role,
              fullName: data.fullName,
            });
            res.status(200).json({
              msg: "Berhasil login",
              email: data.email,
              role: data.role,
              fullName: data.fullName,
              token,
            });
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static register(req, res, next) {
    const { fullName, email, password } = req.body;
    User.create({ fullName, email, password })
      .then((data) => {
        res.status(201).json({ msg: `${data.fullName} berhasil registrasi` });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = HomeController;
