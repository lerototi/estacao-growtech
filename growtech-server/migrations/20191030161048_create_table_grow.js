exports.up = function(knex) {
  return knex.schema.createTable("grow", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.string("name", 15).notNullable();
    table.decimal("height");
    table.decimal("width");
    table.decimal("lengh");
    table.string("location", 20);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("grow");
};
