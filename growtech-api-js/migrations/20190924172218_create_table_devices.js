
exports.up = function(knex) {
  return knex.schema.createTable('device', table => {
      table.increments('id').primary()
      table.text('name').notNull()
      table.text('identifier_code').notNull()
      table.dateTime('created_at')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('device')
};
