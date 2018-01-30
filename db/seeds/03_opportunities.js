exports.seed = function(knex, Promise) {
  return knex('opportunities').del()
    .then(function () {
      return knex('opportunities').insert([
        {id: 1, title: 'Seeking mock interviewers for Web Development Students', description: "The Galvanize team is looking for software engineering professionals to help provide mock interviews to our students during this week. Times are flexible! Please reach out if you are interested!", website_url: "http://www.galvanize.com", location_name: "Galvanize - Phoenix", address: "515 East Grant Street", city: "Phoenix", state: "AZ", zip: 85004, category: "Mock Interviews", start_date: '2018-02-22', end_date: '2018-02-27', seeker_id: 1},
        {id: 2, title: 'Workshop Presenters Needed at Nevada Teacher Training', description: "TRI Leadership Resources in partnership with the Nevada Business Association are looking for business leaders to present a workshop at our regional meeting", website_url: "http://www.teamtri.com/", location_name: "MGM Grand - West Ballroom", address: "3799 S. Las Vegas Blvd", city: "Las Vegas", state: "NV", zip: 89109, category: "Workshop Presenter", start_date: '2018-02-22', start_time: '05:30:00 PM', end_time: '07:30:00 PM', seeker_id: 2},
        {id: 3, title: 'Teacher seeking Software Engineering Professional to Speak to Students', description: "I am a high school teacher in Safford Arizona looking for a Software Engineer to speak to my business students. Our semester ends in May, and I am very flexible with the dates!", website_url: "http://www.saffordhighschool.com/", location_name: "Safford High School", address: "1400 W. Bulldog Blvd", city: "Safford", state: "AZ", zip: 85546, category: "Classroom Speaker", seeker_id: 3},
        {id: 4, title: 'Need panelists to discuss Economic Development at yearly forum', description: "I represent a high school business leadership organziation. We have an open space for a panelist to discuss economic development. Please feel free to reach out if you are interested!", website_url: "http://www.azfbla.org/", location_name: "Westin - Downtown Phoenix", address: "333 North Central Ave", city: "Phoenix", state: "AZ", zip: 85004, category: "Panelist", start_date: '2018-01-26', start_time: '12:30:00 PM', end_time: '02:30:00 PM', seeker_id: 4},
        {id: 5, title: 'Seeking professional women in tech mentors for 5th Grade Students', description: "The CES team is looking for female software engineering professionals to help provide mentorship to our students.", website_url: "http://www.cusd.az.org/",location_name: "Chandler Elementary School", address: "515 East West Street", city: "Chandler", state: "AZ", zip: 85244, category: "Mentorship", start_date: '2018-02-22', end_date: '2018-07-22', seeker_id: 5},
        {id: 6, title: 'Panelist needed for LinkedIn Local Phoenix Events', description: "The Galvanize team is looking software engineers to join our panel at the LinkedIn Local meeting. Topics will vary thoughout the day. Please reach out if you are interested!", website_url: "http://www.galvanize.com/", location_name: "Galvanize - Phoenix", address: "515 East Grant Street", city: "Phoenix", state: "AZ", zip: 85004, category: "Panelist", start_date: '2018-02-22', start_time: '05:30:00 PM', end_time: '07:30:00 PM', seeker_id: 1},
        {id: 7, title: 'Mentorship enrollment is open!', description: "In Phoenix, there are over 50 Immersive Web Development and Data Science students who are looking for mentors as they begin their careers as junior analysts and developers. We would love to talk more with professionals to have theim join our list of amazing mentors!", website_url: "http://www.galvanize.com/", location_name: "Galvanize - Phoenix", address: "515 East Grant Street", city: "Phoenix", state: "AZ", zip: 85004, category: "Mentorship", seeker_id: 1}
      ]);
    });
};
