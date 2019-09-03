
exports.up = function(knex) {
  return knex.schema.createTable('air_temp_humidity', table => {
      table.increments('id').primary()
      table.decimal('temperature', 3, 2)
      table.decimal('humidity', 3, 2)
      table.dateTime('created_at')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('air_temp_humidity')
};
