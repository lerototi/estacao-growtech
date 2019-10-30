exports.up = function(knex) {
  return knex.schema.createTable("stage_types", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.string("desc", 15).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("stage_types");
};
