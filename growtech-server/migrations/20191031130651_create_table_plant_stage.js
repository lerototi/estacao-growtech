exports.up = function(knex) {
  return knex.schema.createTable("plant_stage", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table
      .integer("id_stage_types")
      .unsigned()
      .references("id")
      .inTable("stage_types");
    table
      .integer("id_plant")
      .unsigned()
      .references("id")
      .inTable("plant");
    table.date("started_at").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("plant_stage");
};
