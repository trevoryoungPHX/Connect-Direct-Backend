exports.seed = function(knex, Promise) {
  return knex('opportunities').del()
    .then(function () {
      return knex('opportunities').insert([]);
    });
};
