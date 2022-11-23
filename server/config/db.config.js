module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: null,
  DB: "pbl2",
  dialect: "mysql",
  pool: {
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
