exports.up = function(knex, Promise) {
  return knex.schema.createTable('info_requests', function(table) {
    table.increments();
    table.txt("message");
    table.integer("opportunity_id")
      .references('id')
      .inTable("opportunities")
      .onDelete("CASCADE")
      .index();
    table.integer("user_id")
      .references('id')
      .inTable("users")
      .onDelete("CASCADE")
      .index();
    table.timestamps(true,true);
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('info_requests');
};
