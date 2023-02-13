require("dotenv").config();

const host = process.env.DB_HOST;
const username = process.env.DB_USERAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const dialect = process.env.DB_DIALECT;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
  },
  production: {
    username,
    password,
    database,
    host,
    dialect,
  },
};
