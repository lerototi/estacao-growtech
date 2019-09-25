
exports.up = function(knex) {
  return knex.schema.createTable('device', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('identifier_code').notNull()
      table.dateTime('created_at')
      table.integer('user_id').unsigned().references('id').inTable('user').notNull()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('device')
};
