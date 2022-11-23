const db = require("../models");
const Laporan = db.laporan;
const multer = require("multer");
const path = require("path");

// class LaporanController {
//   static list(req, res, next) {
//     Laporan.findAll()
//       .then((data) => {
//         res.status(200).json({ data });
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }
//   static create(req, res, next) {
//     const { title, nama_kelompok, nama_ketua, nama_manpro, laporan } = req.body;
//     let userId = req.userData.id;
//     Laporan.create({
//       title,
//       nama_kelompok,
//       nama_ketua,
//       nama_manpro,
//       laporan: laporan.path,
//       userId,
//     })
//       .then((data) => {
//         res.status(201).json({ data });
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }
//   static edit(req, res, next) {
//     const { title, nama_kelompok, nama_ketua, nama_manpro, laporan } = req.body;
//     Laporan.update(
//       {
//         title,
//         nama_kelompok,
//         nama_ketua,
//         nama_manpro,
//         laporan,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     )
//       .then((data) => {
//         if (!data) throw { msg: "ERROR! Not Found", status: 404 };
//         else res.status(200).json({ msg: "Berhasil mengedit laporan" });
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }
//   static delete(req, res, next) {
//     const id = req.params.id;
//     Laporan.destroy({
//       where: {
//         id,
//       },
//     })
//       .then((data) => {
//         if (!data) throw { msg: "ERROR! Not Found", status: 404 };
//         else res.status(200).json({ msg: "Berhasil menghapus laporan" });
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }

//   static uploadImage(req, res, next) {
//     const storage = multer.diskStorage({
//       destination: (req, file, cb) => {
//         cb(null, "Images");
//       },
//       filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//       },
//     });

//     const upload = multer({
//       storage: storage,
//     }).single("laporan");
//   }
// }

const list = (req, res, next) => {
  Laporan.findAll()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

const create = (req, res, next) => {
  const { title, nama_kelompok, nama_ketua, nama_manpro } = req.body;
  let userId = req.userData.id;
  Laporan.create({
    title,
    nama_kelompok,
    nama_ketua,
    nama_manpro,
    laporan: req.file.path,
    userId,
  })
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((err) => {
      next(err);
    });
};

const edit = (req, res, next) => {
  const { title, nama_kelompok, nama_ketua, nama_manpro } = req.body;
  Laporan.update(
    {
      title,
      nama_kelompok,
      nama_ketua,
      nama_manpro,
      laporan: req.file.path,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      if (!data) throw { msg: "ERROR! Not Found", status: 404 };
      else res.status(200).json({ msg: "Berhasil mengedit laporan" });
    })
    .catch((err) => {
      next(err);
    });
};

const remove = (req, res, next) => {
  const id = req.params.id;
  Laporan.destroy({
    where: {
      id,
    },
  })
    .then((data) => {
      if (!data) throw { msg: "ERROR! Not Found", status: 404 };
      else res.status(200).json({ msg: "Berhasil menghapus laporan" });
    })
    .catch((err) => {
      next(err);
    });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("laporan");

// module.exports = LaporanController;
module.exports = {
  list,
  create,
  edit,
  remove,
  upload,
};
