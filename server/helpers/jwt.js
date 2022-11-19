const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { createToken, verifyToken };
