
exports.up = function(knex) {
  return knex.schema.createTable('device_sensor', table =>{
      table.increments('id').primary()
      table.integer('device_id').references('id').inTable('device').unsigned().notNull()
      table.integer('sensor_id').references('id').inTable('sensor').unsigned().notNull()
      table.dateTime('created_at')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('device_sensor')
};
