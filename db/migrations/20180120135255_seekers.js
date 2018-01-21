exports.up = function(knex, Promise) {
  return knex.schema.createTable('seekers', function(table) {
    table.increments();
    table.string("first_name");
    table.string("last_name");
    table.string("email_address");
    table.string("password");
    table.string("phone_number");
    table.string("job_title");
    table.string("organization_name");
    table.timestamps(true,true);
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('seekers');
};
