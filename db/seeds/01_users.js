exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, first_name: 'Trevor', last_name: 'Young', email_address: 'trevoryoung.web@gmail.com', password: "password", phone_number: "(928) 965-6426", job_title: "Software Engineer", company_name: "trevdev.co", linkedin_url: "https://www.linkedin.com/in/trevoryoungphx/"}
      ]);
    });
};
