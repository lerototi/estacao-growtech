
exports.up = function(knex) {
  return knex.schema.createTable('device_user', table => {
        table.increments('id').primary()
        table.integer('user_id').references('id').inTable('user').unsigned().notNull()
        table.integer('device_id').references('id').inTable('device').unsigned().notNull()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('device_user')
};
