require("dotenv").config();
const path = require("path");

const migrationsDirectory = path.join(__dirname, "db/migrations");
const seedsDirectory = path.join(__dirname, "/db/seeds");

/* 
We'll use environment variables to set the Postgres username and password
so we don't share that information online.

When we deploy in "production", we'll provide a PG_CONNECTION_STRING
*/

module.exports = {
  development: {
    //database
    client: "pg",
    //connection details, use the connection string or these settings
    connection: process.env.PG_CONNECTION_STRING || {
      host: process.env.DB_HOST, // "127.0.0.1",
      port: process.env.DB_PORT, //5432,
      user: process.env.DB_USER, //"postgres",
      password: process.env.DB_PASSWORD, //"postgres",
      database: process.env.DB_NAME, //"postgres",
    },
    migrations: {
      directory: migrationsDirectory,
    },
    seeds: {
      directory: seedsDirectory,
    },
  },
  production: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: migrationsDirectory,
    },
    seeds: {
      directory: seedsDirectory,
    },
  },
};
