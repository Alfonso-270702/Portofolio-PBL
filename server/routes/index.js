const route = require("express").Router();
const homeRoute = require("./homeRoute");
const laporanRoute = require("./laporanRoute");

route.use("/", homeRoute);
route.use("/laporan", laporanRoute);

module.exports = route;
