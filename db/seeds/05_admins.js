exports.seed = function(knex, Promise) {
  return knex('admins').del()
    .then(function () {
      return knex('admins').insert([
        {id: 1, first_name: 'Trevor', last_name: 'Young', email: 'trevoryoung.web@gmail.com', password: "password"}
      ]);
    });
};
