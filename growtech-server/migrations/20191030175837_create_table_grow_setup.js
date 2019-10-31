exports.up = function(knex) {
  return knex.schema.createTable("grow_setup", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.boolean("default").notNullable;
    table.boolean("custom").notNullable;
    table
      .integer("id_stage_types")
      .unsigned()
      .references("id")
      .inTable("stage_types");
    table
      .integer("id_grow")
      .unsigned()
      .references("id")
      .inTable("grow");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("grow_setup");
};
