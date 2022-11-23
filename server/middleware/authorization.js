const db = require("../models");
const Laporan = db.laporan;

const authorization = (req, res, next) => {
  let { id } = req.params;
  Laporan.findByPk(id)
    .then((data) => {
      if (!data) throw { msg: "Laporan tidak ditemukan", status: 400 };
      else if (data.userId === req.userData.id || req.userData.role === "admin")
        next();
      else throw { msg: "authorization failed", status: 403 };
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = authorization;
