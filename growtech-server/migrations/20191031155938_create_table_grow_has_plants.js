exports.up = function(knex) {
  return knex.schema.createTable("grow_has_plants", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table
      .integer("id_grow")
      .unsigned()
      .references("id")
      .inTable("grow");
    table
      .integer("id_plant")
      .unsigned()
      .references("id")
      .inTable("plant");
    table.date("come_in").notNullable();
    table.date("get_out");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("grow_has_plants");
};
