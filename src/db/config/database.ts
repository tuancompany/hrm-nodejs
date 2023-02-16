require("dotenv").config();

const host = process.env.NODE_ENV === "production" ? process.env.PGHOST : process.env.DB_HOST;
const username = process.env.NODE_ENV === "production" ? process.env.PGUSER : process.env.DB_USERAME;
const password = process.env.NODE_ENV === "production" ? process.env.PGPASSWORD : process.env.DB_PASSWORD;
const database = process.env.NODE_ENV === "production" ? process.env.PGDATABASE : process.env.DB_NAME;
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
