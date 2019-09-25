
exports.up = function(knex) {
    return knex.schema.createTable('sensor', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('marca')
        table.string('modelo')
        table.dateTime('createdAt').notNull()
        table.integer('device_id').unsigned().references('id').inTable('device')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sensor')
};
