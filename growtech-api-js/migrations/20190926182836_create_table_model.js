
exports.up = function(knex) {
    return knex.createTable('model', table => {
        table.increments('id').primary()
        table.string('name', 30).notNull().unique()
        table.integer('brand_id').references('id').inTable('brand')
        table.integer('caracteristics_id').references('id').inTable('caracteristics_grow')
    })
  };
  
  exports.down = function(knex) {
    return knex.dropTable('model')
  };
  