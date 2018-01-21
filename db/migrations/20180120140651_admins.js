exports.up = function(knex, Promise) {
  return knex.schema.createTable('admins', function(table) {
    table.increments();
    table.string("first_name");
    table.string("last_name");
    table.string("email_address");
    table.string("password");
    table.timestamps(true,true);
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admins');
};
