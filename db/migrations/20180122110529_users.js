exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string("first_name");
    table.string("last_name");
    table.string("email");
    table.string("password");
    table.string("phone_number");
    table.string("job_title");
    table.string("company_name");
    table.string("linkedin_url").defaultTo(null);
    table.timestamps(true,true);
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
