exports.up = function(knex) {
  return knex.schema.createTable("plant", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.string("species", 20);
    table.date("germination_date");
    table.boolean("auto_seed");
    table
      .integer("id_grow")
      .unsigned()
      .references("id")
      .inTable("grow");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("plant");
};
