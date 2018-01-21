exports.seed = function(knex, Promise) {
  return knex('info_requests').del()
    .then(function () {
      return knex('info_requests').insert([
        {id: 1, message: "Hey John - My name is Trevor Young. I am a software engineer based out of Phoenix from Safford. I would love the chance to speak to your class about Software Engineering. Take a look at my Linkedin profile and let me know if you would be interested! Is there anything specific you want to cover or do you have any main objectives?", opportunity_id: 3, user_id: 1},
        {id: 2, message: "Maria - I am a software engineer in Phoenix. I feel I would be a great fit for who you are looking for, I have quite a large network of fantastic female engineers who would be happy to participate as well. Please feel free to reach out if you are interested in learning more!", opportunity_id: 1, user_id: 1}
      ]);
    });
};
