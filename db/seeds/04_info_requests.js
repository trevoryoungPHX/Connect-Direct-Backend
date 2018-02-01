exports.seed = function(knex, Promise) {
  return knex('info_requests').del()
    .then(function () {
      return knex('info_requests').insert([

]);
    });
};
