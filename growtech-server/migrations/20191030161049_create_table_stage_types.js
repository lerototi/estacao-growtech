exports.up = function(knex) {
  return knex.schema
    .createTable("stage_types", table => {
      table
        .increments("id")
        .unsigned()
        .primary();
      table.string("name", 15).notNullable();
      table.string("desc", 25);
    })
    .then(function() {
      return knex("stage_types").insert([
        {
          name: "vega",
          desc: "Estágio de crescimento."
        },
        {
          name: "flora",
          desc: "Estágio de floração."
        },
        {
          name: "mother",
          desc: "Planta mãe."
        },
        {
          name: "clone",
          desc: "Clones."
        }
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("stage_types");
};
