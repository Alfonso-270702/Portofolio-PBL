require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ip = process.env.IP || "localhost";
const route = require("./routes");
const errHandler = require("./middleware/errHandler");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/Images", express.static("./Images"));

app.use(route);
app.use(errHandler);

if (process.env.NODE_ENV != "test") {
  app.listen(port, ip, () => console.log(`running on port ${port}`));
}

module.exports = app;
