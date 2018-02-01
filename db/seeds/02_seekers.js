exports.seed = function(knex, Promise) {
  return knex('seekers').del()
    .then(function () {
      return knex('seekers').insert([]);
    });
};
