const route = require("express").Router();
const LaporanController = require("../controllers/laporanController");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

route.use(authentication);

route.post("/create", LaporanController.upload, LaporanController.create);
route.get("/list", LaporanController.list);
route.put(
  "/edit/:id",
  authorization,
  LaporanController.upload,
  LaporanController.edit
);
route.delete("/delete/:id", authorization, LaporanController.remove);

module.exports = route;
