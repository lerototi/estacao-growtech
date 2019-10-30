/*
    Put database configs inside .env file at the root of the project:
    DB_HOST, DB_SERVICE_NAME, DB_USER and DB_PASSWORD
*/
require("dotenv").config();

module.exports = {
  client: process.env.DB_DRIVER,
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_SCHEMA || process.env.DB_SERVICE_NAME
  },
  migrations: {
    tableName: "KNEX_MIGRATIONS"
  }
};
