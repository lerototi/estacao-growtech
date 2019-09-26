exports.up = function(knex) {
    return knex.schema.createTable('grow', table=> {
        table.increments('id').primary()
        table.string('name', 30).notNull()
        table.string('description')
        table.boolean('flora')
        table.boolean('vega')
        table.integer('model_id').unsigned().references('id').inTable('model')
        table.integer('user_id').unsigned().references('id').inTable('user')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('grow')
};
