require("dotenv").config();
const https = require("https");
const fs = require("fs");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ip = process.env.IP || "localhost";
const route = require("./routes");
const errHandler = require("./middleware/errHandler");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "/Images")));
app.use("/Images", express.static("./Images"));

app.use(route);
app.use(errHandler);
app.get("/", (req, res) => {
  res.send("Hello from express server.");
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(port, ip, () => {
    console.log(`running on port ${port}`);
  });

module.exports = app;
