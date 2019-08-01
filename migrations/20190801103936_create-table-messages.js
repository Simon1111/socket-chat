
exports.up = function(knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.text('message');
    table.text('idroom');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('messages');
};
