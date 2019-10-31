exports.up = function(knex) {
  return knex.schema.createTable("grow_setup", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.boolean("default").notNullable;
    table.boolean("custom").notNullable;
    table
      .integer("grow_type_id")
      .unsigned()
      .references("id")
      .inTable("grow_type");
    table
      .integer("grow_id")
      .unsigned()
      .references("id")
      .inTable("grow");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("grow_setup");
};
