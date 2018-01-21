exports.up = function(knex, Promise) {
  return knex.schema.createTable('opportunities', function(table) {
    table.increments();
    table.txt("title");
    table.txt("description");
    table.string("location_name");
    table.string("address");
    table.string("city");
    table.string("state");
    table.integer("zip");
    table.string("category");
    table.date("start_date").defaultTo(null);
    table.date("end_date").defaultTo(null);
    table.time("start_time").defaultTo(null);
    table.time("end_time").defaultTo(null);
    table.integer("seeker_id")
    .references('id')
    .inTable("seekers")
    .onDelete("CASCADE")
    .index();
    table.timestamps(true,true);
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('opportunities');
};
