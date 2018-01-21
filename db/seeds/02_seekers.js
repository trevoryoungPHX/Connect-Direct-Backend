exports.seed = function(knex, Promise) {
  return knex('seekers').del()
    .then(function () {
      return knex('seekers').insert([
        {id: 1, first_name: 'Maria', last_name: 'Montoya', email_address: 'maria.montoya@galvanize.com', password: "password", phone_number: "(928) 888-9999", job_title: "Senior Career Services Manager", organization_name: "Galvanize"},
        {id: 2, first_name: 'Marci', last_name: 'Barlow', email_address: 'marci.barlow@teamTRI.com', password: "password", phone_number: "(928) 777-8888", job_title: "Association Services Manager", organization_name: "TRI Leadership Resources"},
        {id: 3, first_name: 'John', last_name: 'Dunning', email_address: 'john.dunning@susd.com', password: "password", phone_number: "(928) 334-3578", job_title: "Business Mangement Teacher", organization_name: "Safford High School"},
        {id: 4, first_name: 'Ryan', last_name: 'Hamilton', email_address: 'ryan.hamilton@azfbla.org', password: "password", phone_number: "(480) 393-3334", job_title: "State Director", organization_name: "Future Business Leaders of America - Arizona"},
        {id: 5, first_name: 'Haley', last_name: 'Jones', email_address: 'Haley@ces.org', password: "password", phone_number: "(480) 393-3334", job_title: "Elementary School Teacher", organization_name: "Chandler Elementary School"}
      ]);
    });
};
