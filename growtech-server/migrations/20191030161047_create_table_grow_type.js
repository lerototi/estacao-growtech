exports.up = function(knex) {
  return knex.schema.createTable("grow_type", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.string("name", 15).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("grow_type");
};
