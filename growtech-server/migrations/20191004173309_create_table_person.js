exports.up = function(knex) {
  return knex.schema
    .createTable("person", table => {
      table
        .increments("id")
        .unsigned()
        .primary();
      table.string("first_name", 40).notNullable();
      table.string("last_name", 70).notNullable();
    })
    .then(function() {
      return knex("person").insert([
        {
          first_name: "Leonardo",
          last_name: "Torres"
        }
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("person");
};
