
exports.up = function(knex) {
  return knex.createTable('brand', table => {
      table.increments('id').primary()
      table.string('name', 30)
  })
};

exports.down = function(knex) {
  return knex.dropTable('brand')
};
