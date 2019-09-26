
exports.up = function(knex) {
  return knex.createTable('caracteristics_grow', table => {
      table.increments('id').primary()
      table.decimal('width').notNull()
      table.decimal('height').notNull()
      table.decimal('length').notNull()
      table.boolean('builded')
      table.string('material')
  })
};

exports.down = function(knex) {
  
};
