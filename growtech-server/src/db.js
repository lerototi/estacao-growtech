const config = require("../knexfile");
const db = require("knex")(config);

db.migrate.latest([config]);
module.exports = db;
