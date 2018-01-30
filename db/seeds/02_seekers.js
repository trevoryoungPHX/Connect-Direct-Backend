exports.seed = function(knex, Promise) {
  return knex('seekers').del()
    .then(function () {
      return knex('seekers').insert([
        {id: 1, first_name: 'Maria', last_name: 'Montoya', email: 'maria.montoya@galvanize.com', password: "password", job_title: "Senior Career Services Manager", organization_name: "Galvanize"},
        {id: 2, first_name: 'Marci', last_name: 'Barlow', email: 'marci.barlow@teamTRI.com', password: "password", job_title: "Association Services Manager", organization_name: "TRI Leadership Resources"},
        {id: 3, first_name: 'John', last_name: 'Dunning', email: 'john.dunning@susd.com', password: "password", job_title: "Business Mangement Teacher", organization_name: "Safford High School"},
        {id: 4, first_name: 'Ryan', last_name: 'Hamilton', email: 'ryan.hamilton@azfbla.org', password: "password", job_title: "State Director", organization_name: "Future Business Leaders of America - Arizona"},
        {id: 5, first_name: 'Haley', last_name: 'Jones', email: 'Haley@ces.org', password: "password", job_title: "Elementary School Teacher", organization_name: "Chandler Elementary School"}
      ]);
    });
};
